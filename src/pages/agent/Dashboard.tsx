import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { transactions, formatNaira, statusLabels, statusColors } from "@/lib/mockData";
import { Transaction } from "@/types/transaction";
import { Shield, RefreshCw, Filter, Search, Plus, Trash2, ChevronDown, ChevronUp, MessageCircle, Phone, Truck, CheckCircle, XCircle, DollarSign, Circle } from "lucide-react";

const AgentDashboard = () => {
  const { transactions: allTransactions, updateTransaction } = useApp();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isActionPanelOpen, setIsActionPanelOpen] = useState(false);

  const filteredTransactions = allTransactions
    .filter((tx) => {
      if (activeTab !== "all" && tx.status !== activeTab) return false;
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        tx.id.toLowerCase().includes(term) ||
        tx.buyerName.toLowerCase().includes(term) ||
        tx.sellerName.toLowerCase().includes(term) ||
        tx.itemName.toLowerCase().includes(term)
      );
    })
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const handleConfirmPayment = (transactionId: string) => {
    updateTransaction(transactionId, {
      status: "payment_confirmed",
      escrowLocked: true,
    });
    setIsActionPanelOpen(false);
  };

  const handleReleaseFunds = (transactionId: string) => {
    updateTransaction(transactionId, {
      status: "delivered",
      buyerConfirmed: true,
    });
    setIsActionPanelOpen(false);
  };

  const handleFlagDispute = (transactionId: string) => {
    updateTransaction(transactionId, {
      disputeFlagged: true,
    });
    setIsActionPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">Agent Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setSearchTerm("")}>
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              onClick={() => setIsActionPanelOpen(false)}
            >
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Transaction Queue */}
          <div className="lg:col-span-2">
            <Card className="border-orange-100">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold">Transaction Queue</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setActiveTab("all")}>
                      All {allTransactions.length}
                    </Button>
                    <Button
                      variant={activeTab === "pending_payment" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab("pending_payment")}
                    >
                      Pending {allTransactions.filter((t) => t.status === "pending_payment").length}
                    </Button>
                    <Button
                      variant={activeTab === "payment_confirmed" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab("payment_confirmed")}
                    >
                      Confirmed {allTransactions.filter((t) => t.status === "payment_confirmed").length}
                    </Button>
                    <Button
                      variant={activeTab === "in_transit" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab("in_transit")}
                    >
                      In Transit {allTransactions.filter((t) => t.status === "in_transit").length}
                    </Button>
                    <Button
                      variant={activeTab === "delivered" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setActiveTab("delivered")}
                    >
                      Delivered {allTransactions.filter((t) => t.status === "delivered").length}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="overflow-hidden">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>

                <Table className="w-full mt-4">
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHeader className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</TableHeader>
                      <TableHeader className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</TableHeader>
                      <TableHeader className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</TableHeader>
                      <TableHeader className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</TableHeader>
                      <TableHeader className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHeader>
                      <TableHeader className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHeader>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((tx) => (
                      <TableRow
                        key={tx.id}
                        className="hover:bg-gray-50 cursor-pointer border-b"
                        onClick={() => {
                          setSelectedTransaction(tx);
                          setIsActionPanelOpen(true);
                        }}
                      >
                        <TableCell className="px-4 py-3 text-sm font-medium whitespace-nowrap">
                          {tx.id}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tx.buyerName.toLowerCase()}`}
                              alt={tx.buyerName}
                              className="w-8 h-8 rounded-full"
                            />
                            <span>{tx.buyerName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tx.sellerName.toLowerCase()}`}
                              alt={tx.sellerName}
                              className="w-8 h-8 rounded-full"
                            />
                            <span>{tx.sellerName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm whitespace-nowrap">
                          {formatNaira(tx.totalAmount)}
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[tx.status as keyof typeof statusColors]}`}
                          >
                            {statusLabels[tx.status as keyof typeof statusLabels]}
                          </span>
                        </TableCell>
                        <TableCell className="px-4 py-3 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {tx.status === "pending_payment" && (
                                                          <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              handleConfirmPayment(tx.id);
                                                            }}
                                                          >
                                                            Confirm Payment
                                                          </Button>
                                                        )}
                                                        {tx.status === "delivered" && !tx.disputeFlagged && (
                                                          <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={(e) => {
                                                              e.stopPropagation();
                                                              handleReleaseFunds(tx.id);
                                                            }}
                                                          >
                                                            Release Funds
                                                          </Button>
                                                        )}
                                                        <Button
                                                          variant="outline"
                                                          size="sm"
                                                          onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleFlagDispute(tx.id);
                                                          }}
                                                        >
                                                          Flag Dispute
                                                        </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredTransactions.length === 0 && (
                      <TableRow>
                        <TableCell colSpan="6" className="px-4 py-6 text-center text-gray-500">
                          No transactions found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Action Panel */}
          <div className="lg:col-span-1">
            {selectedTransaction && isActionPanelOpen && (
              <Card className="border-orange-100">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">Transaction Details</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedTransaction(null);
                        setIsActionPanelOpen(false);
                      }}
                    >
                      <XCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg border">
                      <img
                        src={selectedTransaction.itemImage}
                        alt={selectedTransaction.itemName}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{selectedTransaction.itemName}</h3>
                        <p className="text-gray-600">{selectedTransaction.itemDescription}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Buyer</p>
                        <p className="font-semibold">{selectedTransaction.buyerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Seller</p>
                        <p className="font-semibold">{selectedTransaction.sellerName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Amount</p>
                        <p className="text-lg font-bold text-orange-600">{formatNaira(selectedTransaction.totalAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Reference</p>
                        <p className="font-mono text-sm">{selectedTransaction.paymentReference}</p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm text-gray-600 mb-2">Status History</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Order Placed</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedTransaction.escrowLocked ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                              <span className="text-sm">Payment Confirmed</span>
                            </>
                          ) : (
                            <>
                              <Circle className="h-4 w-4 border border-gray-300" />
                              <span className="text-sm text-gray-500">Payment Pending</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedTransaction.logisticsConfirmed ? (
                            <>
                              <Truck className="h-4 w-4 text-purple-500" />
                              <span className="text-sm">In Transit</span>
                            </>
                          ) : (
                            <>
                              <Circle className="h-4 w-4 border border-gray-300" />
                              <span className="text-sm text-gray-500">Awaiting Pickup</span>
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {selectedTransaction.buyerConfirmed ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span className="text-sm">Delivered</span>
                            </>
                          ) : (
                            <>
                              <Circle className="h-4 w-4 border border-gray-300" />
                              <span className="text-sm text-gray-500">Awaiting Confirmation</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardFooter>
                    <div className="flex gap-3">
                      {selectedTransaction.status === "pending_payment" && (
                        <Button
                          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                          onClick={() => {
                            handleConfirmPayment(selectedTransaction.id);
                          }}
                        >
                          Confirm Payment Received
                        </Button>
                      )}
                      {selectedTransaction.status === "delivered" && !selectedTransaction.disputeFlagged && (
                        <Button
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                          onClick={() => {
                            handleReleaseFunds(selectedTransaction.id);
                          }}
                        >
                          Release Funds to Seller
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          handleFlagDispute(selectedTransaction.id);
                        }}
                      >
                        Flag Dispute
                      </Button>
                    </div>
                  </CardFooter>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AgentDashboard;