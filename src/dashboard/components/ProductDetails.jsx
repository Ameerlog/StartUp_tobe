import { useState } from 'react'
import { 
  Package,
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Star,
  ChevronRight,
  Shield,
  RotateCcw,
  MessageCircle,
  Copy,
  ExternalLink
} from 'lucide-react'
import clsx from 'clsx'

const statusConfig = {
  delivered: { 
    label: 'Delivered', 
    color: 'bg-green-100 text-green-700', 
    icon: CheckCircle,
    description: 'Your order has been delivered'
  },
  shipped: { 
    label: 'Shipped', 
    color: 'bg-blue-100 text-blue-700', 
    icon: Truck,
    description: 'Your order is on the way'
  },
  processing: { 
    label: 'Processing', 
    color: 'bg-orange-100 text-orange-700', 
    icon: Clock,
    description: 'We\'re preparing your order'
  },
}

export function ProductDetail({ item, category, orderHistory }) {
  const [activeTab, setActiveTab] = useState('details')

  if (!item) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Select a Product</h3>
          <p className="text-gray-500 mt-2">
            Choose a product from the left panel to view its details and order history.
          </p>
        </div>
      </div>
    )
  }

  const status = statusConfig[item.status]
  const StatusIcon = status.icon

  // Find related order
  const relatedOrder = orderHistory.find(o => o.id === item.orderId)

  // Order tracking steps
  const trackingSteps = [
    { label: 'Order Placed', date: item.purchaseDate, completed: true },
    { label: 'Processing', completed: item.status !== 'processing' || true },
    { label: 'Shipped', completed: item.status === 'shipped' || item.status === 'delivered' },
    { label: 'Delivered', date: item.deliveryDate, completed: item.status === 'delivered' },
  ]

  const tabs = [
    { id: 'details', label: 'Details' },
    { id: 'tracking', label: 'Tracking' },
    { id: 'invoice', label: 'Invoice' },
  ]

  return (
    <div className="space-y-6">
      {/* Product Header */}
      <div className="dash-card overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Product Image */}
            <div className="w-full lg:w-48 h-48 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{category.name}</p>
                  <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {item.color && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {item.color}
                      </span>
                    )}
                    {item.size && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Size: {item.size}
                      </span>
                    )}
                    {item.quantity > 1 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        Qty: {item.quantity}
                      </span>
                    )}
                  </div>
                </div>

                {/* Price & Status */}
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <div className={clsx(
                    'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full mt-3',
                    status.color
                  )}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{status.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-3">
          {item.status === 'delivered' && (
            <>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                <RotateCcw className="w-4 h-4" />
                Buy Again
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
                <Star className="w-4 h-4" />
                Write Review
              </button>
            </>
          )}
          {item.status === 'shipped' && (
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
              <Truck className="w-4 h-4" />
              Track Package
            </button>
          )}
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            <MessageCircle className="w-4 h-4" />
            Get Help
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'pb-4 text-sm font-medium border-b-2 -mb-px transition-colors',
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {activeTab === 'details' && (
          <>
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Info */}
              <div className="dash-card">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900">Order Information</h2>
                </div>
                <div className="p-5 grid grid-cols-2 gap-4">
                  <InfoItem 
                    icon={Package} 
                    label="Order ID" 
                    value={item.orderId}
                    copyable
                  />
                  <InfoItem 
                    icon={Calendar} 
                    label="Purchase Date" 
                    value={item.purchaseDate}
                  />
                  <InfoItem 
                    icon={CreditCard} 
                    label="Payment" 
                    value={relatedOrder?.paymentMethod || 'Card'}
                  />
                  <InfoItem 
                    icon={MapPin} 
                    label="Delivery" 
                    value={item.deliveryDate || 'Pending'}
                  />
                </div>
              </div>

              {/* Warranty (if applicable) */}
              {item.warranty && (
                <div className="dash-card p-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Warranty Active</h3>
                      <p className="text-sm text-gray-500">Valid until {item.warranty}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Delivery Address */}
              {relatedOrder && (
                <div className="dash-card p-5">
                  <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                  <p className="text-gray-600 text-sm">{relatedOrder.shippingAddress}</p>
                </div>
              )}

              {/* Need Help */}
              <div className="dash-card p-5">
                <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                <div className="space-y-2">
                  <HelpLink label="Return or Replace" />
                  <HelpLink label="Track Package" />
                  <HelpLink label="Contact Support" />
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'tracking' && (
          <div className="lg:col-span-3">
            <div className="dash-card p-6">
              <h2 className="font-semibold text-gray-900 mb-6">Order Tracking</h2>
              
              {/* Status Banner */}
              <div className={clsx(
                'p-4 rounded-xl mb-6 flex items-center gap-4',
                item.status === 'delivered' ? 'bg-green-50' : 
                item.status === 'shipped' ? 'bg-blue-50' : 'bg-orange-50'
              )}>
                <StatusIcon className={clsx(
                  'w-8 h-8',
                  item.status === 'delivered' ? 'text-green-600' : 
                  item.status === 'shipped' ? 'text-blue-600' : 'text-orange-600'
                )} />
                <div>
                  <p className="font-semibold text-gray-900">{status.label}</p>
                  <p className="text-sm text-gray-600">{status.description}</p>
                </div>
              </div>

              {/* Tracking Number */}
              {relatedOrder?.trackingNumber && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Tracking Number</p>
                    <p className="font-mono font-medium text-gray-900">{relatedOrder.trackingNumber}</p>
                  </div>
                  <button className="p-2 hover:bg-gray-200 rounded-lg">
                    <Copy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              )}

              {/* Timeline */}
              <div className="relative">
                {trackingSteps.map((step, index) => (
                  <div key={index} className="flex gap-4 pb-8 last:pb-0">
                    {/* Line & Dot */}
                    <div className="flex flex-col items-center">
                      <div className={clsx(
                        'w-4 h-4 rounded-full border-2 z-10',
                        step.completed 
                          ? 'bg-green-500 border-green-500' 
                          : 'bg-white border-gray-300'
                      )}>
                        {step.completed && (
                          <CheckCircle className="w-3 h-3 text-white" />
                        )}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className={clsx(
                          'w-0.5 flex-1 mt-2',
                          step.completed ? 'bg-green-500' : 'bg-gray-200'
                        )} />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-2">
                      <p className={clsx(
                        'font-medium',
                        step.completed ? 'text-gray-900' : 'text-gray-400'
                      )}>
                        {step.label}
                      </p>
                      {step.date && (
                        <p className="text-sm text-gray-500">{step.date}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'invoice' && (
          <div className="lg:col-span-3">
            <div className="dash-card">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Invoice</h2>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">
                  <ExternalLink className="w-4 h-4" />
                  Download PDF
                </button>
              </div>
              <div className="p-6">
                {/* Invoice Header */}
                <div className="flex justify-between mb-8">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-mono font-medium">{item.orderId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{item.purchaseDate}</p>
                  </div>
                </div>

                {/* Items */}
                <table className="w-full mb-6">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 text-sm font-medium text-gray-500">Item</th>
                      <th className="text-center py-3 text-sm font-medium text-gray-500">Qty</th>
                      <th className="text-right py-3 text-sm font-medium text-gray-500">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-4">
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </td>
                      <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                      <td className="py-4 text-right font-medium text-gray-900">
                        ${item.price.toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* Total */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Tax</span>
                    <span className="text-gray-900">${(item.price * item.quantity * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-bold text-xl text-gray-900">
                      ${(item.price * item.quantity * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function InfoItem({ icon: Icon, label, value, copyable }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-gray-500" />
      </div>
      <div className="min-w-0">
        <p className="text-sm text-gray-500">{label}</p>
        <div className="flex items-center gap-2">
          <p className="font-medium text-gray-900 truncate">{value}</p>
          {copyable && (
            <button className="p-1 hover:bg-gray-100 rounded">
              <Copy className="w-3.5 h-3.5 text-gray-400" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function HelpLink({ label }) {
  return (
    <button className="w-full flex items-center justify-between p-2 -mx-2 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-gray-900">
      <span className="text-sm">{label}</span>
      <ChevronRight className="w-4 h-4" />
    </button>
  )
}