import {
  Gauge,
  Fuel,
  Edit2,
  Trash2
} from "lucide-react";

const FuelView = ({
  fuelStats,
  fuelRecords,

  fuelTypes,

  formatThaiDate,

  setShowFuelModal,

  startEditFuel,
  deleteFuelRecord
}) => {

  return (
    <>
          <div className="space-y-6">
            {/* Digital Speedometer Dashboard */}
            {fuelStats ? (
              <div className="bg-white/5 backdrop-blur-3xl border border-white/10 shadow-[0_0_60px_rgba(168,85,247,0.15)] backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
                <div className="flex flex-col items-center">
                  {/* Speedometer Circle */}
                  <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8">
                    {/* Outer ring */}
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                      />
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="8"
                        strokeDasharray={`${(fuelStats.avgEfficiency / 60) * 534} 534`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8b5cf6" />
                          <stop offset="50%" stopColor="#a855f7" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Center display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-6xl sm:text-7xl font-black bg-gradient-to-br from-green-400 to-emerald-600 bg-clip-text text-transparent mb-2">
                        {fuelStats.avgEfficiency.toFixed(1)}
                      </div>
                      <div className="text-sm sm:text-base text-gray-400 font-semibold">กม./ลิตร</div>
                      <div className="text-xs text-gray-500 mt-1">เฉลี่ย</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-blue-400">{fuelStats.currentOdometer.toLocaleString()}</div>
                      <div className="text-xs text-gray-400 mt-1">กม. ปัจจุบัน</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-purple-400">{fuelStats.totalDistance.toLocaleString()}</div>
                      <div className="text-xs text-gray-400 mt-1">กม. รวม</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-green-400">{fuelStats.bestEfficiency.toFixed(1)}</div>
                      <div className="text-xs text-gray-400 mt-1">กม./ลิตร ดีที่สุด</div>
                    </div>
                    
                    <div className="bg-white/5 rounded-xl p-4 text-center border border-white/10">
                      <div className="text-2xl sm:text-3xl font-bold text-orange-400">฿{fuelStats.totalSpent.toLocaleString()}</div>
                      <div className="text-xs text-gray-400 mt-1">ค่าน้ำมันรวม</div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-4">
                    <div className="bg-gradient-to-br from-yellow-600/20 to-amber-600/20 rounded-xl p-4 text-center border border-yellow-500/30">
                      <div className="text-xl sm:text-2xl font-bold">{fuelStats.totalLiters.toFixed(2)} ลิตร</div>
                      <div className="text-xs text-gray-400 mt-1">น้ำมันรวม</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 rounded-xl p-4 text-center border border-red-500/30">
                      <div className="text-xl sm:text-2xl font-bold">{fuelStats.worstEfficiency.toFixed(1)} กม./ลิตร</div>
                      <div className="text-xs text-gray-400 mt-1">ต่ำที่สุด</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-xl p-4 text-center border border-cyan-500/30">
                      <div className="text-xl sm:text-2xl font-bold">{fuelStats.recordCount} ครั้ง</div>
                      <div className="text-xs text-gray-400 mt-1">จำนวนครั้งที่เติม</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-12 border border-white/10 text-center">
                <Gauge size={64} className="mx-auto mb-4 text-gray-500 opacity-50" />
                <h3 className="text-2xl font-bold mb-2">ยังไม่มีข้อมูลการเติมน้ำมัน</h3>
                <p className="text-gray-400 mb-6">เริ่มบันทึกการเติมน้ำมันเพื่อดูสถิติและอัตราสิ้นเปลือง</p>
                <button
                  onClick={() => setShowFuelModal(true)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 px-8 py-3 rounded-xl font-bold transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <Fuel size={20} />
                  เพิ่มข้อมูลการเติมน้ำมัน
                </button>
              </div>
            )}

            {/* Fuel Records List */}
            {fuelRecords.length > 0 && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-white/10 shadow-2xl">
                <div className="mb-6">
                  <h3 className="text-2xl font-black flex items-center gap-3">
                    <Fuel className="text-fuchsia-400" />
                    Fuel Intelligence Timeline
                  </h3>
                  <div className="text-sm text-white/50 mt-1">
                    วิเคราะห์จากข้อมูลการเติมน้ำมันจริง
                  </div>
                </div>
                <div className="space-y-3">

                  {[...fuelRecords]

                    .sort((a, b) => {

                      const dateDiff =
                        new Date(b.date) -
                        new Date(a.date);

                      if (dateDiff !== 0)
                        return dateDiff;

                      return (
                        b.odometer -
                        a.odometer
                      );

                    })

                    .map((record) => (

                    <div key={record.id} className="
                        bg-gradient-to-br
                        from-white/5
                        to-white/[0.02]

                        backdrop-blur-2xl

                        rounded-2xl

                        p-4

                        border border-white/10

                        hover:border-fuchsia-500/40

                        hover:shadow-[0_0_25px_rgba(168,85,247,0.2)]

                        transition-all duration-300

                        group
                        ">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-sm font-semibold ${fuelTypes[record.fuelType].color}`}>
                              {fuelTypes[record.fuelType].name}
                            </span>
                            <span className="text-xs text-gray-500">•</span>
                            <span className="text-xs text-gray-400">{formatThaiDate(record.date)}</span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
                            <div>
                              <div className="text-gray-400 text-xs">เลขไมล์</div>
                              <div className="font-bold">{record.odometer.toLocaleString()} กม.</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-xs">จำนวน</div>
                              <div className="font-bold">{record.liters.toFixed(2)} ลิตร</div>
                            </div>
                            <div>
                              <div className="text-gray-400 text-xs">ราคา</div>
                              <div className="font-bold">฿{record.totalPrice.toFixed(2)}</div>
                            </div>
                            {record.efficiency && (
                              <div>
                                <div className="text-gray-400 text-xs">อัตราสิ้นเปลือง</div>
                                <div className="font-bold text-green-400">{record.efficiency.toFixed(2)} กม./ลิตร</div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <button
                            onClick={() => startEditFuel(record)}
                            className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteFuelRecord(record.id)}
                            className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
    </>
  );

};

export default FuelView;