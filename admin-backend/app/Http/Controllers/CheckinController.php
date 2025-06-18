<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\CheckinMaster;
use App\Models\CheckinRoomTrans;

class CheckinController extends Controller
{
    public function getArrivalModes(Request $request)
    {
        $arrivalModes = DB::table('arrival_mode')
            ->select('id', 'mode_name') 
            ->where('is_active', 1)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $arrivalModes, 
        ]);
    }
    
    public function getAllGender(Request $request)
    {
        $gender = DB::table('gender_master')
            ->select('id', 'gender_name') 
            ->where('is_active', 1)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $gender, 
        ]);
    }
    
    public function getAllTitleMaster(Request $request)
    {
        $title = DB::table('title_master')
            ->select('id', 'title_name') 
            ->where('is_active', 1)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $title, 
        ]);
    }
    public function getAllSegments(Request $request)
    {
        $segments = DB::table('segment_master')
            ->select('id', 'segment_name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $segments, 
        ]);
    }
    public function getAllBusinessSources(Request $request)
    {
        $businesssource = DB::table('business_source')
            ->select('id', 'source_name')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $businesssource, 
        ]);
    }
    
    public function getAllRoomTypes(Request $request)
    {
        $roomtypes = DB::table('roomtype_master')
            ->select('id', 'room_type_name')
            ->where('roomtype_status', 'Active')
            ->whereNull('deleted_at')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $roomtypes, 
        ]);
    }


    public function getRoomsByType(Request $request, $roomTypeId)
    {
        $rooms = DB::table('room_master')
            ->select('id', 'room_no', 'room_type_id','max_pax','max_extra_pax')
            ->where('is_active', 1)
            ->where('room_type_id', $roomTypeId)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $rooms,
        ]);
    }
    public function getRoomTypePlan(Request $request, $roomTypeId)
    {
        $plans = DB::table('plans')
            ->select('*')
            ->where('status', 'Active')
            ->where('room_type_id', $roomTypeId)
            ->get();

        return response()->json([
            'success' => true,
            'data' => $plans,
        ]);
    }
    public function checkinConfirm(Request $request)
    {
        $data = $request->all();

        DB::beginTransaction();

        try {
            // Insert into checkin_master
            $checkin = CheckinMaster::create([
                'is_reservation' => $data['guestInfo']['is_reservation'] ?? 0,
                'reservation_number' => $data['guestInfo']['reservation_number'] ?? null,
                'arrival_mode' => $data['guestInfo']['arrival_mode'] ?? null,
                'ota' => $data['guestInfo']['ota'] ?? null,
                'booking_id' => $data['guestInfo']['booking_id'] ?? null,
                'contact' => $data['guestInfo']['contact'] ?? null,
                'title' => $data['guestInfo']['title'] ?? null,
                'first_name' => $data['guestInfo']['first_name'] ?? null,
                'last_name' => $data['guestInfo']['last_name'] ?? null,
                'gender' => $data['guestInfo']['gender'] ?? null,
                'city' => $data['guestInfo']['city'] ?? null,
                'id_number' => $data['guestInfo']['id_number'] ?? null,
                'email' => $data['guestInfo']['email'] ?? null,
                'check_in_mode' => $data['guestInfo']['check_in_mode'] ?? null,
                'allow_credit' => $data['guestInfo']['allow_credit'] ?? null,
                'foreign_guest' => $data['guestInfo']['foreign_guest'] ?? null,
                'segment_id' => $data['guestInfo']['segment_id'] ?? null,
                'business_source_id' => $data['guestInfo']['business_source_id'] ?? null,
                'photo' => $data['guestInfo']['photo'] ?? null,
                'document' => $data['guestInfo']['document'] ?? null,
                'gst_number' => $data['guestInfo']['gst_number'] ?? null,
                'guest_company' => $data['guestInfo']['guest_company'] ?? null,
                'age' => $data['guestInfo']['age'] ?? null,
                'gst_type' => $data['guestInfo']['gst_type'] ?? null,
                'address' => $data['guestInfo']['address'] ?? null,
                'visit_remark' => $data['guestInfo']['visit_remark'] ?? null,
                'pin_code' => $data['guestInfo']['pin_code'] ?? null,
                'nationality' => $data['guestInfo']['nationality'] ?? null,
                'booking_instructions' => $data['guestInfo']['booking_instructions'] ?? null,
                'guest_special_instructions' => $data['guestInfo']['guest_special_instructions'] ?? null,
                'is_vip' => $data['guestInfo']['is_vip'] ?? 0,
                'check_in_type' => $data['guestInfo']['check_in_type'] ?? null,
                'check_in_datetime' => $data['guestInfo']['check_in_datetime'] ?? null,
                'number_of_days' => $data['guestInfo']['number_of_days'] ?? 1,
                'check_out_datetime' => $data['guestInfo']['check_out_datetime'] ?? null,
                'grace_hours' => $data['guestInfo']['grace_hours'] ?? 0,
                'payment_by' => $data['guestInfo']['payment_by'] ?? null,
                'allow_charges_posting' => $data['guestInfo']['allow_charges_posting'] ?? 0,
                'enable_paxwise' => $data['guestInfo']['enable_paxwise'] ?? 0,
                'enable_room_sharing' => $data['guestInfo']['enable_room_sharing'] ?? 0,
            ]);

            // Insert each room detail into checkin_room_trans
            foreach ($data['roomDetails'] as $room) {
                CheckinRoomTrans::create([
                    'checkin_id' => $checkin->id,
                    'room_type_id' => $room['roomTypeId'] ?? null,
                    'room_id' => $room['roomId'] ?? null,
                    'rate_plan_id' => $room['ratePlanId'] ?? null,
                    'guest_name' => $room['guestName'] ?? null,
                    'contact' => $room['contact'] ?? null,
                    'male' => $room['male'] ?? 0,
                    'female' => $room['female'] ?? 0,
                    'extra' => $room['extra'] ?? 0,
                    'net_rate' => $room['netRate'] ?? 0,
                    'disc_type' => $room['discType'] ?? 'No Disc',
                    'disc_val' => $room['discVal'] ?? 0,
                    'total' => $room['total'] ?? 0,
                ]);

                \App\Models\RoomMaster::where('id', $room['roomId'])->update(['checkin_id' => $checkin->id]);

                // ✅ Update room status to '2' (Occupied)
                \App\Models\RoomMaster::where('id', $room['roomId'])->update(['status_id' => 2]);
            }


            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Check-in data saved successfully!',
                'checkin_id' => $checkin->id,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function editCheckin(Request $request, $checkinId)
    {
        $data = $request->all();

        DB::beginTransaction();

        try {
            // Find existing check-in record
            $checkin = CheckinMaster::findOrFail($checkinId);

            // Update checkin_master
            $checkin->update([
                'is_reservation' => $data['guestInfo']['is_reservation'] ?? $checkin->is_reservation,
                'reservation_number' => $data['guestInfo']['reservation_number'] ?? $checkin->reservation_number,
                'arrival_mode' => $data['guestInfo']['arrival_mode'] ?? $checkin->arrival_mode,
                'ota' => $data['guestInfo']['ota'] ?? $checkin->ota,
                'booking_id' => $data['guestInfo']['booking_id'] ?? $checkin->booking_id,
                'contact' => $data['guestInfo']['contact'] ?? $checkin->contact,
                'title' => $data['guestInfo']['title'] ?? $checkin->title,
                'first_name' => $data['guestInfo']['first_name'] ?? $checkin->first_name,
                'last_name' => $data['guestInfo']['last_name'] ?? $checkin->last_name,
                'gender' => $data['guestInfo']['gender'] ?? $checkin->gender,
                'city' => $data['guestInfo']['city'] ?? $checkin->city,
                'id_number' => $data['guestInfo']['id_number'] ?? $checkin->id_number,
                'email' => $data['guestInfo']['email'] ?? $checkin->email,
                'check_in_mode' => $data['guestInfo']['check_in_mode'] ?? $checkin->check_in_mode,
                'allow_credit' => $data['guestInfo']['allow_credit'] ?? $checkin->allow_credit,
                'foreign_guest' => $data['guestInfo']['foreign_guest'] ?? $checkin->foreign_guest,
                'segment_id' => $data['guestInfo']['segment_id'] ?? $checkin->segment_id,
                'business_source_id' => $data['guestInfo']['business_source_id'] ?? $checkin->business_source_id,
                'photo' => $data['guestInfo']['photo'] ?? $checkin->photo,
                'document' => $data['guestInfo']['document'] ?? $checkin->document,
                'gst_number' => $data['guestInfo']['gst_number'] ?? $checkin->gst_number,
                'guest_company' => $data['guestInfo']['guest_company'] ?? $checkin->guest_company,
                'age' => $data['guestInfo']['age'] ?? $checkin->age,
                'gst_type' => $data['guestInfo']['gst_type'] ?? $checkin->gst_type,
                'address' => $data['guestInfo']['address'] ?? $checkin->address,
                'visit_remark' => $data['guestInfo']['visit_remark'] ?? $checkin->visit_remark,
                'pin_code' => $data['guestInfo']['pin_code'] ?? $checkin->pin_code,
                'nationality' => $data['guestInfo']['nationality'] ?? $checkin->nationality,
                'booking_instructions' => $data['guestInfo']['booking_instructions'] ?? $checkin->booking_instructions,
                'guest_special_instructions' => $data['guestInfo']['guest_special_instructions'] ?? $checkin->guest_special_instructions,
                'is_vip' => $data['guestInfo']['is_vip'] ?? $checkin->is_vip,
                'check_in_type' => $data['guestInfo']['check_in_type'] ?? $checkin->check_in_type,
                'check_in_datetime' => $data['guestInfo']['check_in_datetime'] ?? $checkin->check_in_datetime,
                'number_of_days' => $data['guestInfo']['number_of_days'] ?? $checkin->number_of_days,
                'check_out_datetime' => $data['guestInfo']['check_out_datetime'] ?? $checkin->check_out_datetime,
                'grace_hours' => $data['guestInfo']['grace_hours'] ?? $checkin->grace_hours,
                'payment_by' => $data['guestInfo']['payment_by'] ?? $checkin->payment_by,
                'allow_charges_posting' => $data['guestInfo']['allow_charges_posting'] ?? $checkin->allow_charges_posting,
                'enable_paxwise' => $data['guestInfo']['enable_paxwise'] ?? $checkin->enable_paxwise,
                'enable_room_sharing' => $data['guestInfo']['enable_room_sharing'] ?? $checkin->enable_room_sharing,
            ]);

            CheckinRoomTrans::where('checkin_id', $checkinId)->delete();

            foreach ($data['roomDetails'] as $room) {
                CheckinRoomTrans::create([
                    'checkin_id' => $checkin->id,
                    'room_type_id' => $room['roomTypeId'] ?? null,
                    'room_id' => $room['roomId'] ?? null,
                    'rate_plan_id' => $room['ratePlanId'] ?? null,
                    'guest_name' => $room['guestName'] ?? null,
                    'contact' => $room['contact'] ?? null,
                    'male' => $room['male'] ?? 0,
                    'female' => $room['female'] ?? 0,
                    'extra' => $room['extra'] ?? 0,
                    'net_rate' => $room['netRate'] ?? 0,
                    'disc_type' => $room['discType'] ?? 'No Disc',
                    'disc_val' => $room['discVal'] ?? 0,
                    'total' => $room['total'] ?? 0,
                ]);

                \App\Models\RoomMaster::where('id', $room['roomId'])->update(['status_id' => 2]);
            }


            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Check-in updated successfully!',
                'checkin_id' => $checkin->id,
            ]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function checkinList(Request $request)
    {
        try {
            // Get paginated check-in records with all their room details
            $checkins = CheckinMaster::with(['rooms' => function($query) {
                    $query->select('*'); // Get all columns from checkin_room_trans
                }])
                ->select('*') // Get all columns from checkin_master
                ->orderBy('created_at', 'desc')
                ->paginate(10);

            // The resulting structure will automatically nest rooms under each checkin
            return response()->json([
                'status' => true,
                'data' => $checkins,
                'message' => 'Check-in list retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error: ' . $e->getMessage(),
            ], 500);
        }
    }

    public function checkin($checkinId)
    {
        try {
            $checkin = CheckinMaster::with(['rooms' => function($query) {
                    $query->select('*');
                }])
                ->where('id', $checkinId)
                ->first();

            if (!$checkin) {
                return response()->json([
                    'success' => false,
                    'message' => 'Check-in record not found'
                ], 404);
            }

            // Prepare the response data
            $responseData = [
                'guestInfo' => $checkin,
                'roomDetails' => $checkin->rooms
            ];

            return response()->json([
                'success' => true,
                'data' => $responseData
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving check-in details: ' . $e->getMessage()
            ], 500);
        }
    }


    
    
}