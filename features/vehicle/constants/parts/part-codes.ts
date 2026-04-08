export enum PartCodes {
  // ENGINE
  ENGINE_OIL = "engine_oil",
  ENGINE_BLOCK = "engine_block",
  ENGINE_MOUNT = "engine_mount",
  TIMING_BELT = "timing_belt",
  TIMING_CHAIN = "timing_chain",
  CAMSHAFT = "camshaft",
  CRANKSHAFT = "crankshaft",
  VALVE = "valve",
  CYLINDER_HEAD = "cylinder_head",
  PISTON = "piston",

  // FILTERS
  OIL_FILTER = "oil_filter",
  AIR_FILTER = "air_filter",
  CABIN_FILTER = "cabin_filter",
  FUEL_FILTER = "fuel_filter",

  // IGNITION
  SPARK_PLUG = "spark_plug",
  IGNITION_COIL = "ignition_coil",
  GLOW_PLUG = "glow_plug",

  // FUEL SYSTEM
  FUEL_PUMP = "fuel_pump",
  FUEL_INJECTOR = "fuel_injector",
  FUEL_TANK = "fuel_tank",
  THROTTLE_BODY = "throttle_body",

  // COOLING
  RADIATOR = "radiator",
  COOLANT = "coolant",
  WATER_PUMP = "water_pump",
  THERMOSTAT = "thermostat",
  COOLING_FAN = "cooling_fan",

  // FLUIDS
  TRANSMISSION_OIL = "transmission_oil",
  BRAKE_FLUID = "brake_fluid",
  POWER_STEERING_FLUID = "power_steering_fluid",
  WINDSHIELD_FLUID = "windshield_fluid",
  ADBLUE = "adblue",

  // TRANSMISSION
  CLUTCH_SET = "clutch_set",
  GEARBOX = "gearbox",
  DRIVE_SHAFT = "drive_shaft",
  DIFFERENTIAL = "differential",

  // BRAKE
  BRAKE_PAD = "brake_pad",
  BRAKE_DISC = "brake_disc",
  BRAKE_CALIPER = "brake_caliper",
  ABS_SENSOR = "abs_sensor",

  // SUSPENSION
  SHOCK_ABSORBER = "shock_absorber",
  SUSPENSION_SPRING = "suspension_spring",
  CONTROL_ARM = "control_arm",
  BALL_JOINT = "ball_joint",
  TIE_ROD = "tie_rod",
  STEERING_RACK = "steering_rack",
  WHEEL_BEARING = "wheel_bearing",

  // TIRE
  TIRE = "tire",
  WINTER_TIRE = "winter_tire",
  SUMMER_TIRE = "summer_tire",
  ALL_SEASON_TIRE = "all_season_tire",
  RIM = "rim",
  WHEEL_BOLT = "wheel_bolt",

  // ELECTRICAL
  BATTERY = "battery",
  ALTERNATOR = "alternator",
  STARTER_MOTOR = "starter_motor",
  FUSE = "fuse",
  RELAY = "relay",
  WIRING = "wiring",

  // LIGHTING
  HEADLIGHT = "headlight",
  TAILLIGHT = "taillight",
  FOG_LIGHT = "fog_light",
  SIGNAL_LIGHT = "signal_light",
  INTERIOR_LIGHT = "interior_light",

  // HVAC
  AC_COMPRESSOR = "ac_compressor",
  AC_GAS = "ac_gas",
  AC_FILTER = "ac_filter",
  HEATER_CORE = "heater_core",

  // BODY
  BUMPER = "bumper",
  HOOD = "hood",
  DOOR = "door",
  MIRROR = "mirror",
  WINDSHIELD = "windshield",
  WINDOW = "window",
  WIPER_BLADE = "wiper_blade",

  // INTERIOR
  SEAT = "seat",
  SEAT_COVER = "seat_cover",
  DASHBOARD = "dashboard",
  FLOOR_MAT = "floor_mat",
  INFOTAINMENT = "infotainment",

  // EV
  BATTERY_PACK = "battery_pack",
  ELECTRIC_MOTOR = "electric_motor",
  INVERTER = "inverter",
  CHARGING_PORT = "charging_port",
  CHARGING_CABLE = "charging_cable",

  // SENSOR
  OXYGEN_SENSOR = "oxygen_sensor",
  MAF_SENSOR = "maf_sensor",
  MAP_SENSOR = "map_sensor",
  TEMPERATURE_SENSOR = "temperature_sensor",
  PARKING_SENSOR = "parking_sensor",
  CAMERA = "camera",
}
export type PartCode = (typeof PartCodes)[keyof typeof PartCodes];
