<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\BlockMaster;
use App\Models\FloorMaster;
use App\Models\RoomTypeMaster;
use App\Models\RoomStatusMaster;
use App\Models\RoomMaster;
use Carbon\Carbon;
use App\Models\Plan;
use Illuminate\Support\Facades\DB;  // Add this for DB facade

class DashboardController extends Controller
{
    public function getAllActiveRooms(Request $request)
    {
        $rooms = DB::table('room_master as rm')
            ->join('floor_master as fm', 'rm.floor_id', '=', 'fm.id')
            ->join('roomtype_master as rtm', 'rm.room_type_id', '=', 'rtm.id')
            ->join('roomstatus_master as rsm', 'rm.status_id', '=', 'rsm.id')
            ->select(
                'rm.*',
                'fm.floor_name',
                'rtm.room_type_name',
                'rsm.status_name',
                'rsm.color_code',
            )
            ->where('rm.is_active', 1)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $rooms,
        ]);
    }
}
