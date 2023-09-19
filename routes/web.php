<?php

use App\Http\Controllers\User\PermissionController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RawatJalan\PoliController;
use App\Http\Controllers\User\RoleController;
use App\Http\Controllers\User\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::Resource('users', UserController::class);
Route::Resource('RawatJalan', PoliController::class);
Route::apiResource('roles', RoleController::class);
Route::apiResource('permissions', PermissionController::class);

//Route Poli
$sections = DB::table('SIMmSection')->where('TipePelayanan', 'RJ')->where('SectionName', 'like', '%poli%')->get();
foreach ($sections as $section) {
    Route::prefix(strtolower(preg_replace('/\s+/', '-', $section->SectionName)))->middleware('can:lihat data '.strtolower($section->SectionName))->group(function () use ($section) {
            Route::get('/poli/{'.$section->SectionID.'}', [PoliController::class, 'index'])->name('poli.'.$section->SectionID);
            // route::get('poli/detailpx/{SectionID}/{NoReg}/{Nomor}', [
            //     DetailPXController::class,
            //     'index',
            // ])->name('poli.'.$section->SectionID.'detailpx');
        });
}
//END Route Poli

require __DIR__.'/auth.php';
