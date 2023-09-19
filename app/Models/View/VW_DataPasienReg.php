<?php

namespace App\Models\View;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VW_DataPasienReg extends Model
{
    use HasFactory;
    protected $table = 'VW_DataPasienReg';
    protected $primaryKey = 'NoReg';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $casts = [
        'Tanggal' => 'datetime:Y-m-d',
        'Jam' => 'datetime:H:i',
    ];
}
