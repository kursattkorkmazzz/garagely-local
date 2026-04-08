import { FuelTypes, type FuelType } from "../fuel-types";
import { PartCodes } from "./part-codes";
import { PartGroups, type PartGroup } from "./part-groups";

export type PartDefinition = {
  code: string;
  group: PartGroup;
  applicableTo?: {
    fuelTypes?: FuelType[];
  };
};

export const VEHICLE_PARTS: Record<string, PartDefinition> = {
  // ENGINE
  [PartCodes.ENGINE_OIL]: {
    code: PartCodes.ENGINE_OIL,
    group: PartGroups.ENGINE,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.ENGINE_BLOCK]: {
    code: PartCodes.ENGINE_BLOCK,
    group: PartGroups.ENGINE,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.ENGINE_MOUNT]: {
    code: PartCodes.ENGINE_MOUNT,
    group: PartGroups.ENGINE,
  },
  [PartCodes.TIMING_BELT]: {
    code: PartCodes.TIMING_BELT,
    group: PartGroups.ENGINE,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.TIMING_CHAIN]: {
    code: PartCodes.TIMING_CHAIN,
    group: PartGroups.ENGINE,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.CAMSHAFT]: {
    code: PartCodes.CAMSHAFT,
    group: PartGroups.ENGINE,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.CRANKSHAFT]: {
    code: PartCodes.CRANKSHAFT,
    group: PartGroups.ENGINE,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.VALVE]: {
    code: PartCodes.VALVE,
    group: PartGroups.ENGINE,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.CYLINDER_HEAD]: {
    code: PartCodes.CYLINDER_HEAD,
    group: PartGroups.ENGINE,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.PISTON]: {
    code: PartCodes.PISTON,
    group: PartGroups.ENGINE,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },

  // FILTERS
  [PartCodes.OIL_FILTER]: {
    code: PartCodes.OIL_FILTER,
    group: PartGroups.FILTER,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.AIR_FILTER]: {
    code: PartCodes.AIR_FILTER,
    group: PartGroups.FILTER,
  },
  [PartCodes.CABIN_FILTER]: {
    code: PartCodes.CABIN_FILTER,
    group: PartGroups.FILTER,
  },
  [PartCodes.FUEL_FILTER]: {
    code: PartCodes.FUEL_FILTER,
    group: PartGroups.FILTER,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },

  // IGNITION
  [PartCodes.SPARK_PLUG]: {
    code: PartCodes.SPARK_PLUG,
    group: PartGroups.IGNITION,
    applicableTo: {
      fuelTypes: [FuelTypes.GASOLINE, FuelTypes.HYBRID, FuelTypes.LPG],
    },
  },
  [PartCodes.IGNITION_COIL]: {
    code: PartCodes.IGNITION_COIL,
    group: PartGroups.IGNITION,
    applicableTo: {
      fuelTypes: [FuelTypes.GASOLINE, FuelTypes.HYBRID, FuelTypes.LPG],
    },
  },
  [PartCodes.GLOW_PLUG]: {
    code: PartCodes.GLOW_PLUG,
    group: PartGroups.IGNITION,
    applicableTo: { fuelTypes: [FuelTypes.DIESEL] },
  },

  // FUEL SYSTEM
  [PartCodes.FUEL_PUMP]: {
    code: PartCodes.FUEL_PUMP,
    group: PartGroups.FUEL_SYSTEM,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.FUEL_INJECTOR]: {
    code: PartCodes.FUEL_INJECTOR,
    group: PartGroups.FUEL_SYSTEM,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.FUEL_TANK]: {
    code: PartCodes.FUEL_TANK,
    group: PartGroups.FUEL_SYSTEM,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.THROTTLE_BODY]: {
    code: PartCodes.THROTTLE_BODY,
    group: PartGroups.FUEL_SYSTEM,
    applicableTo: {
      fuelTypes: [FuelTypes.GASOLINE, FuelTypes.HYBRID, FuelTypes.LPG],
    },
  },

  // COOLING
  [PartCodes.RADIATOR]: {
    code: PartCodes.RADIATOR,
    group: PartGroups.COOLING,
  },
  [PartCodes.COOLANT]: {
    code: PartCodes.COOLANT,
    group: PartGroups.COOLING,
  },
  [PartCodes.WATER_PUMP]: {
    code: PartCodes.WATER_PUMP,
    group: PartGroups.COOLING,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.THERMOSTAT]: {
    code: PartCodes.THERMOSTAT,
    group: PartGroups.COOLING,
  },
  [PartCodes.COOLING_FAN]: {
    code: PartCodes.COOLING_FAN,
    group: PartGroups.COOLING,
  },

  // FLUIDS
  [PartCodes.TRANSMISSION_OIL]: {
    code: PartCodes.TRANSMISSION_OIL,
    group: PartGroups.FLUID,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.BRAKE_FLUID]: {
    code: PartCodes.BRAKE_FLUID,
    group: PartGroups.FLUID,
  },
  [PartCodes.POWER_STEERING_FLUID]: {
    code: PartCodes.POWER_STEERING_FLUID,
    group: PartGroups.FLUID,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.WINDSHIELD_FLUID]: {
    code: PartCodes.WINDSHIELD_FLUID,
    group: PartGroups.FLUID,
  },
  [PartCodes.ADBLUE]: {
    code: PartCodes.ADBLUE,
    group: PartGroups.FLUID,
    applicableTo: { fuelTypes: [FuelTypes.DIESEL] },
  },

  // TRANSMISSION
  [PartCodes.CLUTCH_SET]: {
    code: PartCodes.CLUTCH_SET,
    group: PartGroups.TRANSMISSION,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.GEARBOX]: {
    code: PartCodes.GEARBOX,
    group: PartGroups.TRANSMISSION,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.DRIVE_SHAFT]: {
    code: PartCodes.DRIVE_SHAFT,
    group: PartGroups.TRANSMISSION,
  },
  [PartCodes.DIFFERENTIAL]: {
    code: PartCodes.DIFFERENTIAL,
    group: PartGroups.TRANSMISSION,
  },

  // BRAKE
  [PartCodes.BRAKE_PAD]: {
    code: PartCodes.BRAKE_PAD,
    group: PartGroups.BRAKE,
  },
  [PartCodes.BRAKE_DISC]: {
    code: PartCodes.BRAKE_DISC,
    group: PartGroups.BRAKE,
  },
  [PartCodes.BRAKE_CALIPER]: {
    code: PartCodes.BRAKE_CALIPER,
    group: PartGroups.BRAKE,
  },
  [PartCodes.ABS_SENSOR]: {
    code: PartCodes.ABS_SENSOR,
    group: PartGroups.BRAKE,
  },

  // SUSPENSION
  [PartCodes.SHOCK_ABSORBER]: {
    code: PartCodes.SHOCK_ABSORBER,
    group: PartGroups.SUSPENSION,
  },
  [PartCodes.SUSPENSION_SPRING]: {
    code: PartCodes.SUSPENSION_SPRING,
    group: PartGroups.SUSPENSION,
  },
  [PartCodes.CONTROL_ARM]: {
    code: PartCodes.CONTROL_ARM,
    group: PartGroups.SUSPENSION,
  },
  [PartCodes.BALL_JOINT]: {
    code: PartCodes.BALL_JOINT,
    group: PartGroups.SUSPENSION,
  },
  [PartCodes.TIE_ROD]: {
    code: PartCodes.TIE_ROD,
    group: PartGroups.SUSPENSION,
  },
  [PartCodes.STEERING_RACK]: {
    code: PartCodes.STEERING_RACK,
    group: PartGroups.SUSPENSION,
  },
  [PartCodes.WHEEL_BEARING]: {
    code: PartCodes.WHEEL_BEARING,
    group: PartGroups.SUSPENSION,
  },

  // TIRE
  [PartCodes.TIRE]: {
    code: PartCodes.TIRE,
    group: PartGroups.TIRE,
  },
  [PartCodes.WINTER_TIRE]: {
    code: PartCodes.WINTER_TIRE,
    group: PartGroups.TIRE,
  },
  [PartCodes.SUMMER_TIRE]: {
    code: PartCodes.SUMMER_TIRE,
    group: PartGroups.TIRE,
  },
  [PartCodes.ALL_SEASON_TIRE]: {
    code: PartCodes.ALL_SEASON_TIRE,
    group: PartGroups.TIRE,
  },
  [PartCodes.RIM]: {
    code: PartCodes.RIM,
    group: PartGroups.TIRE,
  },
  [PartCodes.WHEEL_BOLT]: {
    code: PartCodes.WHEEL_BOLT,
    group: PartGroups.TIRE,
  },

  // ELECTRICAL
  [PartCodes.BATTERY]: {
    code: PartCodes.BATTERY,
    group: PartGroups.ELECTRICAL,
  },
  [PartCodes.ALTERNATOR]: {
    code: PartCodes.ALTERNATOR,
    group: PartGroups.ELECTRICAL,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.STARTER_MOTOR]: {
    code: PartCodes.STARTER_MOTOR,
    group: PartGroups.ELECTRICAL,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.FUSE]: {
    code: PartCodes.FUSE,
    group: PartGroups.ELECTRICAL,
  },
  [PartCodes.RELAY]: {
    code: PartCodes.RELAY,
    group: PartGroups.ELECTRICAL,
  },
  [PartCodes.WIRING]: {
    code: PartCodes.WIRING,
    group: PartGroups.ELECTRICAL,
  },

  // LIGHTING
  [PartCodes.HEADLIGHT]: {
    code: PartCodes.HEADLIGHT,
    group: PartGroups.LIGHTING,
  },
  [PartCodes.TAILLIGHT]: {
    code: PartCodes.TAILLIGHT,
    group: PartGroups.LIGHTING,
  },
  [PartCodes.FOG_LIGHT]: {
    code: PartCodes.FOG_LIGHT,
    group: PartGroups.LIGHTING,
  },
  [PartCodes.SIGNAL_LIGHT]: {
    code: PartCodes.SIGNAL_LIGHT,
    group: PartGroups.LIGHTING,
  },
  [PartCodes.INTERIOR_LIGHT]: {
    code: PartCodes.INTERIOR_LIGHT,
    group: PartGroups.LIGHTING,
  },

  // HVAC
  [PartCodes.AC_COMPRESSOR]: {
    code: PartCodes.AC_COMPRESSOR,
    group: PartGroups.HVAC,
  },
  [PartCodes.AC_GAS]: {
    code: PartCodes.AC_GAS,
    group: PartGroups.HVAC,
  },
  [PartCodes.AC_FILTER]: {
    code: PartCodes.AC_FILTER,
    group: PartGroups.HVAC,
  },
  [PartCodes.HEATER_CORE]: {
    code: PartCodes.HEATER_CORE,
    group: PartGroups.HVAC,
  },

  // BODY
  [PartCodes.BUMPER]: {
    code: PartCodes.BUMPER,
    group: PartGroups.BODY,
  },
  [PartCodes.HOOD]: {
    code: PartCodes.HOOD,
    group: PartGroups.BODY,
  },
  [PartCodes.DOOR]: {
    code: PartCodes.DOOR,
    group: PartGroups.BODY,
  },
  [PartCodes.MIRROR]: {
    code: PartCodes.MIRROR,
    group: PartGroups.BODY,
  },
  [PartCodes.WINDSHIELD]: {
    code: PartCodes.WINDSHIELD,
    group: PartGroups.BODY,
  },
  [PartCodes.WINDOW]: {
    code: PartCodes.WINDOW,
    group: PartGroups.BODY,
  },
  [PartCodes.WIPER_BLADE]: {
    code: PartCodes.WIPER_BLADE,
    group: PartGroups.BODY,
  },

  // INTERIOR
  [PartCodes.SEAT]: {
    code: PartCodes.SEAT,
    group: PartGroups.INTERIOR,
  },
  [PartCodes.SEAT_COVER]: {
    code: PartCodes.SEAT_COVER,
    group: PartGroups.INTERIOR,
  },
  [PartCodes.DASHBOARD]: {
    code: PartCodes.DASHBOARD,
    group: PartGroups.INTERIOR,
  },
  [PartCodes.FLOOR_MAT]: {
    code: PartCodes.FLOOR_MAT,
    group: PartGroups.INTERIOR,
  },
  [PartCodes.INFOTAINMENT]: {
    code: PartCodes.INFOTAINMENT,
    group: PartGroups.INTERIOR,
  },

  // EV
  [PartCodes.BATTERY_PACK]: {
    code: PartCodes.BATTERY_PACK,
    group: PartGroups.EV,
    applicableTo: { fuelTypes: [FuelTypes.ELECTRIC] },
  },
  [PartCodes.ELECTRIC_MOTOR]: {
    code: PartCodes.ELECTRIC_MOTOR,
    group: PartGroups.EV,
    applicableTo: { fuelTypes: [FuelTypes.ELECTRIC, FuelTypes.HYBRID] },
  },
  [PartCodes.INVERTER]: {
    code: PartCodes.INVERTER,
    group: PartGroups.EV,
    applicableTo: { fuelTypes: [FuelTypes.ELECTRIC, FuelTypes.HYBRID] },
  },
  [PartCodes.CHARGING_PORT]: {
    code: PartCodes.CHARGING_PORT,
    group: PartGroups.EV,
    applicableTo: { fuelTypes: [FuelTypes.ELECTRIC] },
  },
  [PartCodes.CHARGING_CABLE]: {
    code: PartCodes.CHARGING_CABLE,
    group: PartGroups.EV,
    applicableTo: { fuelTypes: [FuelTypes.ELECTRIC] },
  },

  // SENSOR
  [PartCodes.OXYGEN_SENSOR]: {
    code: PartCodes.OXYGEN_SENSOR,
    group: PartGroups.SENSOR,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.MAF_SENSOR]: {
    code: PartCodes.MAF_SENSOR,
    group: PartGroups.SENSOR,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.MAP_SENSOR]: {
    code: PartCodes.MAP_SENSOR,
    group: PartGroups.SENSOR,
    applicableTo: {
      fuelTypes: [
        FuelTypes.GASOLINE,
        FuelTypes.DIESEL,
        FuelTypes.HYBRID,
        FuelTypes.LPG,
      ],
    },
  },
  [PartCodes.TEMPERATURE_SENSOR]: {
    code: PartCodes.TEMPERATURE_SENSOR,
    group: PartGroups.SENSOR,
  },
  [PartCodes.PARKING_SENSOR]: {
    code: PartCodes.PARKING_SENSOR,
    group: PartGroups.SENSOR,
  },
  [PartCodes.CAMERA]: {
    code: PartCodes.CAMERA,
    group: PartGroups.SENSOR,
  },
};
