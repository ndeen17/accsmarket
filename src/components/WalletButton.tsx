import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Wallet } from 'lucide-react';

const WalletButton: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleWalletAccess = () => {
    if (!isAuthenticated) {
      toast({ 
        title: 'Access Denied', 
        description: 'Please log in to access the wallet.', 
        variant: 'destructive' // updated variant
      });
      return;
    }
    // Redirect to wallet page or perform wallet-related actions
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center text-blue-600 hover:text-blue-800"
      onClick={handleWalletAccess}
    >
      <Wallet className="h-4 w-4 mr-1" />
      <span className="hidden sm:inline">Wallet</span>
    </Button>
  );
};

export default WalletButton;
