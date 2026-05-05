import React from "react";
import { useTranslation } from "react-i18next";
import { Separator } from "../ui/separator";
import { CheckCircle, Loader2, Shield } from "lucide-react";
import { Button } from "../ui/button";

const PayementStep = ({
  selectedDate,
  selectedSlot,
  consultationType,
  doctorName,
  slotDuration,
  consultationFee,
  onBack,
  onConfirm,
  loading,
}) => {
  const { t } = useTranslation();
  const platformFees = Math.round(consultationFee * 0.1);
  const totalAmount = consultationFee + platformFees;

  const handlePaynow = () => {
    onConfirm();
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          {t('bookingFlow.booking_confirmation')}
        </h3>
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">{t('bookingFlow.booking_summary')}</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('bookingFlow.date_time')}</span>
              <span className="font-medium">
                {selectedDate?.toLocaleDateString()} at {selectedSlot}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t('bookingFlow.consultation_type')}</span>
              <span className="font-medium">{consultationType}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t('bookingFlow.doctor')}</span>
              <span className="font-medium">{doctorName}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t('bookingFlow.duration')}</span>
              <span className="font-medium">{slotDuration} {t('bookingFlow.minutes')}</span>
            </div>

            <Separator />

            <div className="flex justify-between">
              <span className="text-gray-600">{t('bookingFlow.fees')}</span>
              <span className="font-medium">₹{consultationFee}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">{t('bookingFlow.platform_fee')}</span>
              <span className="font-medium">₹{platformFees}</span>
            </div>

            <Separator />

            <div className="flex justify-between text-lg">
              <span className="font-semibold">{t('bookingFlow.total_amount')}</span>
              <span className="font-bold text-green-600">₹{totalAmount}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg mb-8">
          <Shield className="w-6 h-6 text-green-600" />
          <div>
            <p className="font-medium text-green-800">{t('bookingFlow.secure_booking')}</p>
            <p>{t('bookingFlow.secure_desc')}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <Button variant="outline" onClick={onBack} className="px-8 py-3">
          {t('bookingFlow.back')}
        </Button>
        <Button
          onClick={handlePaynow}
          disabled={loading}
          className="px-8 py-3 bg-green-600 hover:bg-green-700 text-lg font-semibold"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              <span className="text-sm md:text-lg">
                {t('bookingFlow.booking_progress')}
              </span>
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2 " />
              <span className="text-sm md:text-lg">{t('bookingFlow.book_appointment')}</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PayementStep;