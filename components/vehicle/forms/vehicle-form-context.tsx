import { Currency, DistanceUnit, Timezone } from "@/constants";
import { BodyType, FuelType, TransmissionType } from "@/features/vehicle";
import { Formik, useFormikContext } from "formik";
import React, { createContext, ReactNode, useContext, useState } from "react";

export type VehicleFormValues = {
  coverImageId?: string; // ID of the current asset
  selectedCoverImageUri?: string; // URI of the uploaded asset
  brand: string;
  model: string;
  year: number;
  plate: string;
  color?: string;
  vin?: string;

  fuelType?: FuelType;
  bodyType?: BodyType;
  transmissionType?: TransmissionType;

  purchaseDate?: number;
  purchaseTimezone?: Timezone;

  purchasePrice?: number;
  purchaseCurrency?: Currency;

  purchaseOdometer?: number;
  purchaseOdometerUnit?: DistanceUnit;
};

const initialValues: VehicleFormValues = {
  coverImageId: undefined,
  selectedCoverImageUri: undefined,
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  plate: "",
  color: undefined,
  vin: undefined,
  fuelType: undefined,
  bodyType: undefined,
  transmissionType: undefined,
  purchaseDate: undefined,
  purchaseTimezone: undefined,
  purchasePrice: undefined,
  purchaseCurrency: undefined,
  purchaseOdometer: undefined,
  purchaseOdometerUnit: undefined,
};

type StepContextValue = {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  isFirstStep: boolean;
  isLastStep: boolean;
};

const StepContext = createContext<StepContextValue | null>(null);

export function useVehicleFormStep() {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error(
      "useVehicleFormStep must be used within VehicleFormProvider",
    );
  }
  return context;
}

export function useVehicleForm() {
  return useFormikContext<VehicleFormValues>();
}

type VehicleFormProviderProps = {
  children: ReactNode;
  onSubmit: (values: VehicleFormValues) => Promise<void>;
};

export function VehicleFormProvider({
  children,
  onSubmit,
}: VehicleFormProviderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const totalSteps = 3;

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (step: number) => {
    if (step >= 0 && step < totalSteps) {
      setCurrentStep(step);
    }
  };

  const stepValue: StepContextValue = {
    currentStep,
    totalSteps,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === totalSteps - 1,
  };

  return (
    <Formik<VehicleFormValues>
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      <StepContext.Provider value={stepValue}>{children}</StepContext.Provider>
    </Formik>
  );
}
