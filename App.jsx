import React, { useState } from 'react';
import { 
  Home, BarChart2, PlusCircle, Package, Award, 
  Upload, X, CheckCircle, IndianRupee, Phone, Calendar, User
} from 'lucide-react';

const INITIAL_INVENTORY = [
  { id: 1, name: 'Royal Jodhpuri Sherwani', category: 'Sherwani', size: 'L', price: 1500, image: null, rentCount: 12 },
  { id: 2, name: 'Classic Navy Blue Suit', category: 'Suit', size: '42', price: 1000, image: null, rentCount: 8 },
  { id: 3, name: 'Indo-Western Silk Kurta', category: 'Western', size: 'M', price: 800, image: null, rentCount: 15 },
];

const INITIAL_RENTS = [
  { 
    id: 101, 
    customerName: 'Rahul Kumar', 
    phone: '9876543210', 
    item: INITIAL_INVENTORY[0], 
    rentDate: '2026-03-18', 
    returnDate: '2026-03-21', 
    totalRent: 4500, 
    pendingAmount: 1500,
    status: 'active'
  },
  { 
    id: 102, 
    customerName: 'Aman Singh', 
    phone: '8765432109', 
    item: INITIAL_INVENTORY[1], 
    rentDate: '2026-03-19', 
    returnDate: '2026-03-20', 
    totalRent: 2000, 
    pendingAmount: 0,
    status: 'active'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [rents, setRents] = useState(INITIAL_RENTS);
  const [draftItemId, setDraftItemId] = useState('');

  // ---------- HOME DASHBOARD LOGIC ----------
  const totalActiveRents = rents.filter(r => r.status === 'active').length;
  const totalPendingAmount = rents.filter(r => r.status === 'active').reduce((acc, curr) => acc + curr.pendingAmount, 0);

  const payPending = (id) => {
    setRents(rents.map(r => r.id === id ? { ...r, pendingAmount: 0 } : r));
  };

  const markReturned = (id) => {
    setRents(rents.map(r => r.id === id ? { ...r, status: 'returned' } : r));
    const returnedRent = rents.find(r => r.id === id);
    if (returnedRent) {
      setInventory(inventory.map(inv => 
        inv.id === returnedRent.item.id ? { ...inv, rentCount: inv.rentCount + 1 } : inv
      ));
    }
  };

  const renderHome = () => (
    <div className="p-4 space-y-6 pb-24">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl flex flex-col justify-between">
          <p className="text-white/80 text-sm font-medium">Active Rents</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-white">{totalActiveRents}</h3>
            <Package className="text-[#8EB998] w-6 h-6 mb-1" />
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur border border-white/20 p-4 rounded-2xl flex flex-col justify-between">
          <p className="text-white/80 text-sm font-medium">Pending Dues</p>
          <div className="flex items-end justify-between mt-2">
            <h3 className="text-3xl font-bold text-white">₹{totalPendingAmount}</h3>
            <IndianRupee className="text-[#E6A689] w-6 h-6 mb-1" />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">Current Rentals</h2>
        <div className="space-y-4">
          {rents.filter(r => r.status === 'active').length === 0 ? (
            <p className="text-white/60 text-center py-8">No active rentals currently.</p>
          ) : rents.filter(r => r.status === 'active').map(rent => (
            <div key={rent.id} className="bg-white rounded-2xl p-4 shadow-lg flex flex-col gap-3">
              <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                <div>
                  <h4 className="font-bold text-[#1A2B3C] text-lg">{rent.customerName}</h4>
                  <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                    <Phone className="w-3 h-3" /> {rent.phone}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className="bg-[#1A2B3C]/10 text-[#1A2B3C] px-2 py-1 rounded-md text-xs font-semibold">
                    {rent.item.name}
                  </span>
                  <p className="text-red-500 text-xs font-bold mt-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Due: {rent.returnDate}
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between text-sm py-1">
                <span className="text-gray-600">Total Rent:</span>
                <span className="font-semibold text-[#1A2B3C]">₹{rent.totalRent}</span>
              </div>
              <div className="flex justify-between text-sm py-1">
                <span className="text-gray-600">Pending:</span>
                <span className={`font-bold ${rent.pendingAmount > 0 ? 'text-[#E6A689]' : 'text-[#8EB998]'}`}>
                  ₹{rent.pendingAmount}
                </span>
              </div>

              <div className="flex gap-2 mt-2">
                {rent.pendingAmount > 0 && (
                  <button 
                    onClick={() => payPending(rent.id)}
                    className="flex-1 bg-[#4A8B9D]/10 text-[#4A8B9D] font-semibold py-2 rounded-xl text-sm transition-colors active:bg-[#4A8B9D]/20 hover:bg-[#4A8B9D]/20"
                  >
                    Pay Pending
                  </button>
                )}
                <button 
                  onClick={() => markReturned(rent.id)}
                  className="flex-1 bg-[#8EB998] text-white font-semibold py-2 rounded-xl text-sm shadow-md transition-transform active:scale-95 hover:bg-[#7aa784] flex justify-center items-center gap-1"
                >
                  <CheckCircle className="w-4 h-4" /> Returned
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ---------- NEW BOOKING FORM LOGIC ----------
  const NewRentForm = () => {
    const [formData, setFormData] = useState({
      customerName: '', phone: '', itemId: draftItemId, rentDate: '', returnDate: '', totalRent: '', advancePaid: ''
    });
    const [idProof, setIdProof] = useState(null);

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setIdProof(reader.result);
        reader.readAsDataURL(file);
      }
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const item = inventory.find(i => i.id === parseInt(formData.itemId));
      if (!item) return alert('Please select an item!');

      const total = parseInt(formData.totalRent || 0);
      const advance = parseInt(formData.advancePaid || 0);

      const newRent = {
        id: Date.now(),
        customerName: formData.customerName,
        phone: formData.phone,
        item,
        rentDate: formData.rentDate,
        returnDate: formData.returnDate,
        totalRent: total,
        pendingAmount: total - advance,
        status: 'active',
        idProof
      };
      setRents([...rents, newRent]);
      setDraftItemId('');
      setActiveTab('Home');
    };

    return (
      <div className="p-4 pb-24">
        <div className="bg-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#4A8B9D] to-[#8EB998]" />
          <h2 className="text-[#1A2B3C] text-2xl font-bold mb-6">New Booking</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Customer Name</label>
              <input required type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4A8B9D] focus:border-transparent outline-none transition-all" 
                value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile Number</label>
              <input required type="tel" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#4A8B9D] focus:border-transparent outline-none transition-all" 
                value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            
            {/* ID Proof Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">ID Proof (Aadhar/PAN)</label>
              {idProof ? (
                <div className="relative rounded-xl overflow-hidden border border-gray-200">
                  <img src={idProof} alt="ID Preview" className="w-full h-32 object-cover" />
                  <button type="button" onClick={() => setIdProof(null)} className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow-sm text-red-500 hover:bg-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-6 h-6 text-[#4A8B9D] mb-2" />
                    <p className="text-sm text-[#4A8B9D] font-medium">Capture or Upload ID</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Select Item</label>
              <select required className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-[#4A8B9D] outline-none"
                value={formData.itemId} onChange={e => setFormData({...formData, itemId: e.target.value})}>
                <option value="">-- Choose Item --</option>
                {inventory.map(item => <option key={item.id} value={item.id}>{item.name} - ₹{item.price}/day</option>)}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Rent Date</label>
                <input required type="date" className="w-full border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 text-sm focus:ring-2 focus:ring-[#4A8B9D] outline-none" 
                  value={formData.rentDate} onChange={e => setFormData({...formData, rentDate: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Return Date</label>
                <input required type="date" className="w-full border border-gray-200 rounded-xl px-3 py-3 bg-gray-50 text-sm focus:ring-2 focus:ring-[#4A8B9D] outline-none" 
                  value={formData.returnDate} onChange={e => setFormData({...formData, returnDate: e.target.value})} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Total Rent</label>
                <input required type="number" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-[#4A8B9D] outline-none" 
                  value={formData.totalRent} onChange={e => setFormData({...formData, totalRent: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Advance Paid</label>
                <input required type="number" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-[#4A8B9D] outline-none" 
                  value={formData.advancePaid} onChange={e => setFormData({...formData, advancePaid: e.target.value})} />
              </div>
            </div>

            <button type="submit" className="w-full bg-[#1A2B3C] text-white font-bold py-4 rounded-xl mt-6 shadow-lg hover:bg-opacity-90 transition-all active:scale-95 flex justify-center items-center gap-2">
              <CheckCircle className="w-5 h-5" /> Confirm Booking
            </button>
          </form>
        </div>
      </div>
    );
  };

  // ---------- STOCK LIST LOGIC ----------
  const StockTab = () => {
    const [showAddForm, setShowAddForm] = useState(false);
    
    return (
      <div className="p-4 pb-24 space-y-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-2xl font-bold">Inventory</h2>
          <button onClick={() => setShowAddForm(!showAddForm)} className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-xl flex items-center gap-2 backdrop-blur transition-colors text-sm font-semibold shadow-sm">
            {showAddForm ? <X className="w-4 h-4"/> : <PlusCircle className="w-4 h-4"/>}
            {showAddForm ? 'Cancel' : 'Add New'}
          </button>
        </div>

        {showAddForm && <AddItemForm onAdd={(newItem) => { setInventory([...inventory, newItem]); setShowAddForm(false); }} />}

        <div className="grid grid-cols-1 gap-4">
          {inventory.map(item => (
            <div key={item.id} className="bg-white rounded-2xl p-4 flex gap-4 shadow-lg items-center">
              <div className="w-20 h-24 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden border border-gray-100 relative">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <Package className="w-8 h-8 opacity-50" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <span className="text-[10px] uppercase font-bold text-[#4A8B9D] tracking-wider bg-[#4A8B9D]/10 px-2 py-0.5 rounded-full inline-block mb-1">
                  {item.category} • Size {item.size}
                </span>
                <h3 className="font-bold text-[#1A2B3C] text-lg leading-tight mb-2 pr-2">{item.name}</h3>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-[#8EB998] font-bold text-sm bg-[#8EB998]/10 inline-block px-2 py-1 rounded-md">
                    ₹{item.price} / day
                  </p>
                  <button 
                    onClick={() => {
                      setDraftItemId(item.id.toString());
                      setActiveTab('New');
                    }}
                    className="bg-[#1A2B3C] text-white text-xs font-bold px-3 py-1.5 rounded-lg active:scale-95 transition-transform shadow"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const AddItemForm = ({ onAdd }) => {
    const [newItem, setNewItem] = useState({ name: '', category: 'Sherwani', size: '', price: '' });
    const [itemImg, setItemImg] = useState(null);

    const handlePhotoUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setItemImg(reader.result);
        reader.readAsDataURL(file);
      }
    };

    const submit = (e) => {
      e.preventDefault();
      onAdd({ ...newItem, id: Date.now(), image: itemImg, rentCount: 0 });
    };

    return (
      <form onSubmit={submit} className="bg-white rounded-2xl p-5 shadow-xl mb-6 relative border border-gray-100 transition-all">
        <h3 className="font-bold text-[#1A2B3C] mb-4 text-lg">Add New Item</h3>
        <div className="space-y-4">
          <div>
            {itemImg ? (
               <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-gray-200">
                <img src={itemImg} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => setItemImg(null)} className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 shadow hover:bg-gray-100"><X className="w-3 h-3"/></button>
               </div>
            ) : (
              <label className="flex items-center gap-2 border-2 border-dashed bg-gray-50 border-gray-300 px-4 py-3 rounded-xl text-sm text-[#4A8B9D] font-semibold cursor-pointer w-max hover:bg-gray-100 transition-colors">
                <Upload className="w-5 h-5"/> Upload Item Photo
                <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </label>
            )}
          </div>
          <input required type="text" placeholder="Item Name (e.g. Classic Suit)" className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A8B9D] text-sm" 
            value={newItem.name} onChange={e => setNewItem({...newItem, name: e.target.value})} />
          <div className="grid grid-cols-2 gap-3">
            <select className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A8B9D] text-sm font-medium"
              value={newItem.category} onChange={e => setNewItem({...newItem, category: e.target.value})}>
              <option>Sherwani</option>
              <option>Suit</option>
              <option>Western</option>
            </select>
            <input required type="text" placeholder="Size (e.g. 42 / L)" className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A8B9D] text-sm" 
              value={newItem.size} onChange={e => setNewItem({...newItem, size: e.target.value})} />
          </div>
          <input required type="number" placeholder="Rent Price / Day (₹)" className="w-full border rounded-xl px-4 py-3 bg-gray-50 outline-none focus:ring-2 focus:ring-[#4A8B9D] text-sm" 
            value={newItem.price} onChange={e => setNewItem({...newItem, price: e.target.value})} />
          
          <button type="submit" className="w-full bg-[#1A2B3C] hover:bg-[#2c4763] text-white font-bold py-3.5 rounded-xl mt-2 text-sm shadow transition-colors flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4" /> Save Item
          </button>
        </div>
      </form>
    );
  };

  // ---------- ANALYTICS LOGIC ----------
  const AnalyticsTab = () => {
    const totalBookings = rents.length;
    const totalRevenue = rents.reduce((sum, r) => sum + r.totalRent, 0);
    
    const sortedInventory = [...inventory].sort((a,b) => b.rentCount - a.rentCount);
    // ensure maxRents > 0 to avoid division by zero graphics
    const maxRents = Math.max(...sortedInventory.map(i => i.rentCount), 1); 
    const topPerformer = sortedInventory[0];

    return (
      <div className="p-4 pb-24 space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur border border-white/20 p-5 rounded-3xl">
            <p className="text-white/80 text-sm font-medium mb-1">Total Bookings</p>
            <h3 className="text-4xl font-extrabold text-white">{totalBookings}</h3>
          </div>
          <div className="bg-gradient-to-br from-[#8EB998] to-[#0A3E3C] p-5 rounded-3xl shadow-lg border border-white/10">
            <p className="text-white/80 text-sm font-medium mb-1">Total Revenue</p>
            <h3 className="text-3xl font-extrabold text-white">₹{totalRevenue}</h3>
          </div>
        </div>

        {topPerformer && topPerformer.rentCount > 0 && (
          <div className="bg-gradient-to-r from-[#E6A689] to-[#D98A6C] rounded-3xl p-6 shadow-xl text-white relative overflow-hidden">
            <div className="absolute -right-6 -top-6 bg-white/20 w-32 h-32 rounded-full blur-2xl"></div>
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="bg-white/30 p-2 rounded-xl backdrop-blur">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-lg uppercase tracking-wide opacity-90">Top Performer</h3>
            </div>
            <h2 className="text-2xl font-bold leading-tight mb-2 relative z-10">{topPerformer.name}</h2>
            <p className="text-white text-sm font-medium bg-black/20 inline-block px-3 py-1 rounded-full backdrop-blur relative z-10">
              Rented {topPerformer.rentCount} times
            </p>
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 shadow-xl">
          <h3 className="text-[#1A2B3C] font-bold text-lg mb-5 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-[#4A8B9D]"/> Item Performance
          </h3>
          <div className="space-y-6">
            {sortedInventory.map((item, idx) => {
              const percentage = (item.rentCount / maxRents) * 100;
              return (
                <div key={item.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-[#1A2B3C] w-3/4 truncate">
                      {idx+1}. {item.name}
                    </span>
                    <span className="text-[#4A8B9D] font-bold">{item.rentCount}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-[#8EB998] to-[#0A3E3C] h-3 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // ---------- MAIN RENDER ----------
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A2B3C] to-[#0A3E3C] font-sans selection:bg-[#4A8B9D]/30 relative max-w-md mx-auto shadow-2xl overflow-x-hidden">
      
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#1A2B3C]/50 backdrop-blur-xl border-b border-white/10 px-6 py-5 flex items-center justify-between shadow-sm">
        <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
          Luxe<span className="text-[#8EB998]">Rentals</span>
        </h1>
        <div className="w-10 h-10 rounded-full border border-white/20 flex justify-center items-center bg-white/10 shadow-inner">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Main Content Area */}
      <main className="min-h-[calc(100vh-140px)]">
        {activeTab === 'Home' && renderHome()}
        {activeTab === 'New' && <NewRentForm />}
        {activeTab === 'Stock' && <StockTab />}
        {activeTab === 'Reports' && <AnalyticsTab />}
      </main>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white shadow-[0_-20px_40px_rgba(0,0,0,0.1)] rounded-t-[2rem] px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab('Home')} className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${activeTab === 'Home' ? 'text-[#1A2B3C]' : 'text-gray-400'}`}>
          <Home className={`w-6 h-6 ${activeTab === 'Home' ? 'stroke-2 text-[#0A3E3C]' : ''}`} />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => setActiveTab('Stock')} className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${activeTab === 'Stock' ? 'text-[#1A2B3C]' : 'text-gray-400'}`}>
          <Package className={`w-6 h-6 ${activeTab === 'Stock' ? 'stroke-2 text-[#0A3E3C]' : ''}`} />
          <span className="text-[10px] font-bold">Stock</span>
        </button>
        
        {/* Main Add Button (Highlighted Pivot) */}
        <button 
          onClick={() => setActiveTab('New')} 
          className="relative -top-7 bg-gradient-to-tr from-[#0A3E3C] to-[#4A8B9D] text-white p-4 rounded-full shadow-2xl shadow-[#0A3E3C]/40 hover:scale-105 active:scale-95 transition-transform border-[4px] border-[#1A2B3C]/10"
        >
          <PlusCircle className="w-8 h-8" />
        </button>

        <button onClick={() => setActiveTab('Reports')} className={`flex flex-col items-center gap-1.5 p-2 transition-colors ${activeTab === 'Reports' ? 'text-[#1A2B3C]' : 'text-gray-400'}`}>
          <BarChart2 className={`w-6 h-6 ${activeTab === 'Reports' ? 'stroke-2 text-[#0A3E3C]' : ''}`} />
          <span className="text-[10px] font-bold">Reports</span>
        </button>
      </div>

    </div>
  );
}
