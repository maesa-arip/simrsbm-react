<?php

namespace App\Http\Controllers\RawatJalan;

use App\Http\Controllers\Controller;
use App\Http\Resources\RawatJalan\PoliResource;
use App\Models\View\VW_DataPasienReg;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PoliController extends Controller
{
    public $loadDefault = 10;
    public function index(Request $request)
    {
        $VW_DataPasienReg = VW_DataPasienReg::query()->select('NoReg','Tanggal','Jam','NamaPasien','NRM','JenisPasien','JenisKelamin','NamaDOkter','SudahPeriksa','NoUrutSection','StatusBayar')->orderBy('NoUrutSection','ASC')->where('SectionID',$request->segment(3))->where('Printed','>',0)->where('Batal',0);
        if ($request->has('startdate') || $request->has('enddate')) {
            $VW_DataPasienReg->where(function ($query) use ($request) {
                if ($request->has('startdate')) {
                    $query->where('Tanggal', '>=', $request->startdate);
                } else {
                    $query->where('Tanggal', '>=', Carbon::today()->toDateString());
                }
                if ($request->has('enddate')) {
                    $query->where('Tanggal', '<=', Carbon::parse($request->enddate)->addDay());
                } else {
                    $query->where('Tanggal', '<=', Carbon::today()->addDay()->toDateString());
                }
            });
        } else {
            $VW_DataPasienReg->whereBetween('VW_DataPasienReg.Tanggal', [Carbon::today()->toDateString(), Carbon::today()->addDay()->toDateString()]);
        }
        if ($request->jenis == '') {
            $VW_DataPasienReg->where('SudahPeriksa',0);
        }
        if ($request->jenis == 'belumperiksa') {
            $VW_DataPasienReg->where('SudahPeriksa',0);
        }
        if ($request->jenis == 'sudahperiksa') {
            $VW_DataPasienReg->where('SudahPeriksa',1);
        }
        if ($request->jenis == 'semuadata') {
            $VW_DataPasienReg->whereIn('SudahPeriksa',[0,1]);
        }
        if ($request->q) {
            $VW_DataPasienReg->where('NamaPasien','like','%'.$request->q.'%')
            ->orWhere('NRM','like','%'.$request->q.'%');
        }
        if ($request->has(['field','direction'])) {
            $VW_DataPasienReg->orderBy($request->field,$request->direction);
        }
        $VW_DataPasienReg = (
            PoliResource::collection($VW_DataPasienReg->fastPaginate($request->load ?? $this->loadDefault)->withQueryString())
        )->additional([
            'attributes' => [
                'total' => 1100,
                'per_page' =>10,
            ],
            'filtered' => [
                'load' => $request->load ?? $this->loadDefault,
                'q' => $request->q ?? '',
                'jenis' => $request->jenis ?? 'belumperiksa',
                'page' => $request->page ?? 1,
                'field' => $request->field ?? '',
                'direction' => $request->direction ?? '',
            ]
        ]);
        return inertia('RawatJalan/Index',['VW_DataPasienReg'=>$VW_DataPasienReg]);
    }
}
