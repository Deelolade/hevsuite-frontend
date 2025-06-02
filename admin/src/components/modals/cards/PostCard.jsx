"use client"

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { postCards, reset } from "../../../store/cards/cardSlice"
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const PostCard = ({ onClose, selectedCards, selectedCardObjects, onPosted }) => {
  const [receiverEmail, setReceiverEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useDispatch()
  const { isError, message } = useSelector((state) => state.cards)

  // Function to generate the PDF
  const generatePostCardPDF = (cardsToExport) => {
    const doc = new jsPDF();
    doc.text("Member Cards to Post", 14, 10);

    // Table columns - QR Code will be in its own column
    const tableColumn = ["QR", "Name", "Member ID", "Status", "Card Type", "Delivery Address", "Town", "Country", "Postcode"];
    
    // Create rows with empty string for QR code column (we'll add the image later)
    const tableRows = cardsToExport.map((card) => [
      "", // Placeholder for QR code
      `${card.userId?.forename || ""} ${card.userId?.surname || ""}`,
      card._id.substring(0, 8),
      card.isBanned ? "Cancelled" : card.approvedByAdmin ? "Active" : "Pending",
      card.cardType,
      card.userId?.addressLine1 || "",
      card.userId?.town || "",
      card.userId?.country || "",
      card.userId?.postcode || "",
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
      headStyles: { fillColor: "#900C3F" },
      // This runs before drawing cells
      willDrawCell: (data) => {
        // Store the current card data in the cell object
        if (data.section === 'body') {
          data.cell.card = cardsToExport[data.row.index];
        }
      },
      // This runs when drawing cells
      didDrawCell: (data) => {
        // Add QR code to the first column (index 0)
        if (data.section === 'body' && data.column.index === 0 && data.cell.card?.qrCode) {
          try {
            const qrCodeDataUrl = data.cell.card.qrCode;
            if (qrCodeDataUrl && qrCodeDataUrl.startsWith('data:image')) {
              // Calculate size and position
              const imgSize = Math.min(data.cell.width - 4, data.cell.height - 4);
              const x = data.cell.x + (data.cell.width - imgSize) / 2;
              const y = data.cell.y + (data.cell.height - imgSize) / 2;
              
              // Add the image
              doc.addImage(
                qrCodeDataUrl,
                'PNG',
                x,
                y,
                imgSize,
                imgSize
              );
            }
          } catch (error) {
            console.error("Error adding QR code:", error);
          }
        }
      },
      columnStyles: {
        0: { cellWidth: 20 } // Narrow column for QR codes
      },
      rowPageBreak: 'avoid'
    });

    return doc.output('bloburl'); // Return as Blob URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!receiverEmail) {
      toast.error("Please enter receiver's email")
      return
    }

    if (!password) {
      toast.error("Please enter your password")
      return
    }

    if (!selectedCardObjects || selectedCardObjects.length === 0) {
      toast.error("Please select at least one card")
      return
    }

    setIsLoading(true)

    try {
      // Generate the PDF Blob URL
      const pdfBlobUrl = generatePostCardPDF(selectedCardObjects);
      
      // Fetch the Blob from the URL
      const response = await fetch(pdfBlobUrl);
      const pdfBlob = await response.blob();

      // Create FormData
      const formData = new FormData();
      formData.append('cardIds', JSON.stringify(selectedCards));
      formData.append('receiverEmail', receiverEmail);
      formData.append('password', password);
      formData.append('pdf', pdfBlob, 'member_cards.pdf');

      await dispatch(postCards(formData)).unwrap()
      toast.success("Cards posted successfully")
      if (onPosted) {
        onPosted();
      }
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      toast.error(error?.message || "Failed to post cards")
      console.error("Posting error:", error);
    } finally {
      setIsLoading(false)
      dispatch(reset())
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Post Cards</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Receivers Email
            </label>
            <input
              type="email"
              value={receiverEmail}
              onChange={(e) => setReceiverEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-4">
            <p className="text-gray-700 text-sm">
              Are you sure you want to post cards to be printed for selected accounts? The request is irreversible.
            </p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Your Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.906-9.715-7.158.217-.42.48-.83.768-1.22M10 11a2 2 0 100-4 2 2 0 000 4zM21.25 12.041c-1.447 4.252-5.237 7.159-9.715 7.159-1.014 0-2.004-.115-2.958-.33M15 12a3 3 0 11-6 0 3 3 0 016 0zm.484 3.054l2.685 2.685c1.147-1.026 2.102-2.047 2.92-3.04M4.604 9.063L7.29 6.378m-.694-2.671A19.023 19.023 0 0112 4c4.478 0 8.268 2.906 9.715 7.158a1.002 1.002 0 010 .684c-.217.42-.48.83-.768 1.22" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.907 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.907-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PostCard