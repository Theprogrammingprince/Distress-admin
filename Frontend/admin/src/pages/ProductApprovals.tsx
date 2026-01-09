import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, AlertCircle, Clock, MapPin, Calendar, Package, User, FileText, Image as ImageIcon, ChevronDown } from 'lucide-react';
import { productApprovalRequests, approvalStats } from '../data/mockApprovals';
import type { ProductApprovalRequest } from '../types';

export default function ProductApprovals() {
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedRequest, setSelectedRequest] = useState<ProductApprovalRequest | null>(null);
    const [showActionModal, setShowActionModal] = useState(false);
    const [actionType, setActionType] = useState<'approve' | 'reject' | 'request_info'>('approve');
    const [actionReason, setActionReason] = useState('');

    const filteredRequests = productApprovalRequests.filter((req) => {
        if (selectedStatus === 'all') return true;
        return req.status === selectedStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-50 text-yellow-700 border-yellow-200';
            case 'approved':
                return 'bg-green-50 text-green-700 border-green-200';
            case 'rejected':
                return 'bg-red-50 text-red-700 border-red-200';
            case 'needs_info':
                return 'bg-blue-50 text-blue-700 border-blue-200';
            default:
                return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const getConditionBadge = (condition: string) => {
        switch (condition) {
            case 'new':
                return 'bg-emerald-50 text-emerald-700';
            case 'like_new':
                return 'bg-blue-50 text-blue-700';
            case 'good':
                return 'bg-green-50 text-green-700';
            case 'fair':
                return 'bg-yellow-50 text-yellow-700';
            case 'poor':
                return 'bg-red-50 text-red-700';
            default:
                return 'bg-gray-50 text-gray-700';
        }
    };

    const handleAction = (type: 'approve' | 'reject' | 'request_info', request: ProductApprovalRequest) => {
        setSelectedRequest(request);
        setActionType(type);
        setShowActionModal(true);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-6 py-5">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Product Approvals</h1>
                        <p className="text-sm text-gray-500 mt-1">Review and approve seller product submissions</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-yellow-600 uppercase">Pending Review</p>
                                <p className="text-2xl font-bold text-yellow-900 mt-1">{approvalStats.totalPending}</p>
                            </div>
                            <Clock className="w-8 h-8 text-yellow-500" />
                        </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-green-600 uppercase">Approved</p>
                                <p className="text-2xl font-bold text-green-900 mt-1">{approvalStats.totalApproved}</p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                    </div>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-red-600 uppercase">Rejected</p>
                                <p className="text-2xl font-bold text-red-900 mt-1">{approvalStats.totalRejected}</p>
                            </div>
                            <XCircle className="w-8 h-8 text-red-500" />
                        </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-medium text-blue-600 uppercase">Needs Info</p>
                                <p className="text-2xl font-bold text-blue-900 mt-1">{approvalStats.needsInfo}</p>
                            </div>
                            <AlertCircle className="w-8 h-8 text-blue-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white border-b border-gray-200 px-6 py-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by product name, seller, or ID..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setSelectedStatus('all')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedStatus === 'all'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setSelectedStatus('pending')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedStatus === 'pending'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Pending
                        </button>
                        <button
                            onClick={() => setSelectedStatus('needs_info')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedStatus === 'needs_info'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Needs Info
                        </button>
                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
                            <Filter className="w-4 h-4" />
                            More Filters
                        </button>
                    </div>
                </div>
            </div>

            {/* Product Requests List */}
            <div className="p-6">
                <div className="space-y-4">
                    {filteredRequests.map((request) => (
                        <div key={request.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="p-5">
                                <div className="flex flex-col lg:flex-row gap-5">
                                    {/* Product Images */}
                                    <div className="flex-shrink-0">
                                        <div className="w-full lg:w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                            {request.product.images.length > 0 ? (
                                                <div className="w-full h-full bg-gradient-to-br from-emerald-100 to-emerald-200 flex items-center justify-center">
                                                    <Package className="w-16 h-16 text-emerald-600" />
                                                </div>
                                            ) : (
                                                <ImageIcon className="w-12 h-12 text-gray-400" />
                                            )}
                                        </div>
                                        <div className="flex gap-1 mt-2">
                                            {request.product.images.slice(1, 4).map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center"
                                                >
                                                    <ImageIcon className="w-5 h-5 text-gray-400" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {request.product.name}
                                                    </h3>
                                                    <span
                                                        className={`px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                                                            request.status
                                                        )}`}
                                                    >
                                                        {request.status.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-500 mb-2">ID: {request.productId}</p>
                                                <p className="text-sm text-gray-700 line-clamp-2">
                                                    {request.product.description}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-emerald-600">
                                                    ${request.product.price.toFixed(2)}
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">{request.product.category}</p>
                                            </div>
                                        </div>

                                        {/* Details Grid */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                                            <div className="flex items-center gap-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Seller</p>
                                                    <p className="text-sm font-medium text-gray-900">{request.seller.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Location</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {request.verification.location.city}, {request.verification.location.state}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Package className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Condition</p>
                                                    <span
                                                        className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${getConditionBadge(
                                                            request.product.condition
                                                        )}`}
                                                    >
                                                        {request.product.condition.replace('_', ' ').toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Used For</p>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {request.product.usageDuration.value}{' '}
                                                        {request.product.usageDuration.unit}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Verification Checks */}
                                        <div className="bg-gray-50 rounded-lg p-3 mb-4">
                                            <p className="text-xs font-semibold text-gray-700 uppercase mb-2">
                                                Security Checks
                                            </p>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                                <div className="flex items-center gap-1.5">
                                                    {request.securityChecks.receiptVerified ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-gray-400" />
                                                    )}
                                                    <span className="text-xs text-gray-600">Receipt</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    {request.securityChecks.locationVerified ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-gray-400" />
                                                    )}
                                                    <span className="text-xs text-gray-600">Location</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    {request.securityChecks.sellerVerified ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-gray-400" />
                                                    )}
                                                    <span className="text-xs text-gray-600">Seller</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    {request.securityChecks.imagesReviewed ? (
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    ) : (
                                                        <XCircle className="w-4 h-4 text-gray-400" />
                                                    )}
                                                    <span className="text-xs text-gray-600">Images</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Receipt Info */}
                                        {request.verification.hasReceipt && (
                                            <div className="flex items-center gap-2 mb-4 p-2 bg-blue-50 rounded border border-blue-100">
                                                <FileText className="w-4 h-4 text-blue-600" />
                                                <span className="text-xs text-blue-700 font-medium">
                                                    Receipt uploaded ({request.verification.receiptImages.length} file
                                                    {request.verification.receiptImages.length > 1 ? 's' : ''})
                                                </span>
                                            </div>
                                        )}

                                        {/* Timestamp */}
                                        <p className="text-xs text-gray-500 mb-3">
                                            Submitted {formatDate(request.submittedAt)}
                                        </p>

                                        {/* Actions */}
                                        {request.status === 'pending' && (
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => handleAction('approve', request)}
                                                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors flex items-center gap-2"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleAction('reject', request)}
                                                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                                                >
                                                    <XCircle className="w-4 h-4" />
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => handleAction('request_info', request)}
                                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                                                >
                                                    <AlertCircle className="w-4 h-4" />
                                                    Request More Info
                                                </button>
                                            </div>
                                        )}
                                        {request.status === 'needs_info' && request.requestedInfo && (
                                            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                                <p className="text-xs font-semibold text-blue-900 mb-1">Info Requested:</p>
                                                <p className="text-sm text-blue-700">{request.requestedInfo}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Action Modal */}
            {showActionModal && selectedRequest && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            {actionType === 'approve' && 'Approve Product'}
                            {actionType === 'reject' && 'Reject Product'}
                            {actionType === 'request_info' && 'Request Additional Information'}
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Product: <span className="font-medium">{selectedRequest.product.name}</span>
                        </p>
                        <textarea
                            value={actionReason}
                            onChange={(e) => setActionReason(e.target.value)}
                            placeholder={
                                actionType === 'approve'
                                    ? 'Add approval notes (optional)...'
                                    : actionType === 'reject'
                                        ? 'Please provide rejection reason...'
                                        : 'Specify what information is needed...'
                            }
                            className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                            rows={4}
                        />
                        <div className="flex gap-2 mt-4">
                            <button
                                onClick={() => {
                                    setShowActionModal(false);
                                    setActionReason('');
                                }}
                                className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Handle action here
                                    console.log(`${actionType} product:`, selectedRequest.id, 'Reason:', actionReason);
                                    setShowActionModal(false);
                                    setActionReason('');
                                }}
                                className={`flex-1 px-4 py-2 text-white rounded-lg text-sm font-medium transition-colors ${actionType === 'approve'
                                        ? 'bg-emerald-600 hover:bg-emerald-700'
                                        : actionType === 'reject'
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
