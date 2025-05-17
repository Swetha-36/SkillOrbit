
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle, AlertCircle, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  level: string | null;
}

const PaymentModal = ({ isOpen, onClose, onSuccess, level }: PaymentModalProps) => {
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const { toast } = useToast();

  const handlePayment = async () => {
    // Simulate payment processing
    setPaymentStatus('processing');
    
    // Simulate API call with 70% success rate
    setTimeout(() => {
      const isSuccess = Math.random() > 0.3; // 70% chance of success
      
      if (isSuccess) {
        setPaymentStatus('success');
        toast({
          title: "Payment Successful!",
          description: `You've unlocked the ${level?.charAt(0).toUpperCase() + level?.slice(1)} level.`,
          duration: 5000,
        });
        // Wait a moment for user to see success message
        setTimeout(() => {
          onSuccess();
          setPaymentStatus('idle');
        }, 1500);
      } else {
        setPaymentStatus('failed');
        toast({
          title: "Payment Failed",
          description: "There was an issue processing your payment. Please try again.",
          variant: "destructive",
        });
      }
    }, 2000);
  };

  const levelName = level?.charAt(0).toUpperCase() + level?.slice(1);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        onClose();
        if (paymentStatus !== 'processing') {
          setPaymentStatus('idle');
        }
      }
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Unlock {levelName} Level</DialogTitle>
        </DialogHeader>
        
        {/* Payment form */}
        {paymentStatus === 'idle' && (
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">{levelName} Level Access</span>
                <span className="font-bold">₹49.00</span>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex items-start mb-4">
                <CreditCard className="mr-2 h-5 w-5" />
                <div>
                  <h3 className="font-medium">Payment Details</h3>
                  <p className="text-sm text-gray-500">This is a simulation - no actual payment will be processed.</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium mb-1">Name on card</label>
                  <input
                    type="text"
                    id="cardName"
                    placeholder="John Doe"
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                    defaultValue="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">Card number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    placeholder="4242 4242 4242 4242"
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                    defaultValue="4242 4242 4242 4242"
                  />
                </div>
                <div className="flex space-x-3">
                  <div className="w-1/2">
                    <label htmlFor="expiry" className="block text-sm font-medium mb-1">Expiry date</label>
                    <input
                      type="text"
                      id="expiry"
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                      defaultValue="12/25"
                    />
                  </div>
                  <div className="w-1/2">
                    <label htmlFor="cvc" className="block text-sm font-medium mb-1">CVC</label>
                    <input
                      type="text"
                      id="cvc"
                      placeholder="123"
                      className="w-full p-2 border rounded-md bg-white dark:bg-gray-800"
                      defaultValue="123"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              By clicking "Pay ₹49", you agree to our terms and privacy policy. 
              All purchased levels remain accessible in your account.
            </p>
          </div>
        )}

        {/* Processing state */}
        {paymentStatus === 'processing' && (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-skillsprint-500 mb-4"></div>
            <p className="text-center">Processing your payment...</p>
          </div>
        )}

        {/* Success state */}
        {paymentStatus === 'success' && (
          <div className="flex flex-col items-center justify-center py-8">
            <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Payment Successful!</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              You've unlocked the {levelName} level.
            </p>
          </div>
        )}

        {/* Failed state */}
        {paymentStatus === 'failed' && (
          <div className="flex flex-col items-center justify-center py-8">
            <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
            <h2 className="text-xl font-medium mb-2">Payment Failed</h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
              There was an issue processing your payment. Please try again.
            </p>
            <Button onClick={() => setPaymentStatus('idle')} variant="outline">
              <RotateCw className="h-4 w-4 mr-2" /> Try Again
            </Button>
          </div>
        )}

        {/* Footer */}
        <DialogFooter>
          {paymentStatus === 'idle' && (
            <>
              <Button onClick={onClose} variant="outline" className="w-full sm:w-auto">Cancel</Button>
              <Button onClick={handlePayment} className="w-full sm:w-auto bg-skillsprint-500 hover:bg-skillsprint-600">
                Pay ₹49
              </Button>
            </>
          )}
          {paymentStatus === 'success' && (
            <Button onClick={onSuccess} className="w-full bg-green-500 hover:bg-green-600">
              Continue to {levelName} Level
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
