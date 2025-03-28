
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, ArrowUpRight, ArrowDownLeft, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletHeader from '@/components/wallet/WalletHeader';
import TransactionItem from '@/components/wallet/TransactionItem';
import AddFundsForm from '@/components/wallet/AddFundsForm';
import WithdrawFundsForm from '@/components/wallet/WithdrawFundsForm';
import { getWalletBalance } from '@/services/walletService';
import { toast } from '@/hooks/use-toast';

// Mock transactions data
const mockTransactions = [
  {
    id: '1',
    type: 'deposit' as const,
    amount: 100,
    currency: 'USD',
    status: 'completed' as const,
    date: '2023-05-15T10:30:00',
    description: 'Deposit via Credit Card'
  },
  {
    id: '2',
    type: 'withdrawal' as const,
    amount: 50,
    currency: 'USD',
    status: 'completed' as const,
    date: '2023-05-10T14:20:00',
    description: 'Withdrawal to Bank Account'
  },
  {
    id: '3',
    type: 'deposit' as const,
    amount: 75,
    currency: 'USD',
    status: 'pending' as const,
    date: '2023-05-05T09:15:00',
    description: 'Deposit via Bitcoin'
  }
];

const WalletPage: React.FC = () => {
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);
  const [transactions] = useState(mockTransactions);

  useEffect(() => {
    document.title = "My Wallet - AccsMarket";
    
    const fetchWalletData = async () => {
      try {
        // In a real app, you would get the wallet ID from auth context
        const data = await getWalletBalance('123');
        setBalance(data.balance || 0);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to load wallet",
          description: "There was an error loading your wallet data. Please refresh the page.",
        });
        setBalance(0);
      } finally {
        setLoading(false);
      }
    };

    // For demo, set a mock balance instead of making an API call
    // In production, uncomment the fetchWalletData() function
    // fetchWalletData();
    
    // Mock data for demo
    setTimeout(() => {
      setBalance(225);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold flex items-center mb-2">
            <Wallet className="h-6 w-6 mr-2 text-blue-600" />
            My Wallet
          </h1>
          <p className="text-gray-600">Manage your funds and track your transactions</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <WalletHeader balance={balance} />
            </div>
            
            <Tabs defaultValue="transactions" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
                <TabsTrigger value="add-funds">Add Funds</TabsTrigger>
                <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transactions" className="mt-0">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="text-lg font-semibold">Recent Transactions</h2>
                  </div>
                  <div className="divide-y">
                    {transactions.length > 0 ? (
                      transactions.map(transaction => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                      ))
                    ) : (
                      <div className="py-8 text-center text-gray-500">
                        <Clock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <p>No transactions yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="add-funds" className="mt-0">
                <div className="max-w-xl mx-auto">
                  <AddFundsForm />
                </div>
              </TabsContent>
              
              <TabsContent value="withdraw" className="mt-0">
                <div className="max-w-xl mx-auto">
                  <WithdrawFundsForm currentBalance={balance} />
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default WalletPage;
