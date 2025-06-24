import Logo from "../../../../assets/logo_white.png";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Line
} from "@react-pdf/renderer";


// PDF Styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 36,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  leftHeader: {
    flexDirection: "column",
    gap: "10px",
    alignItems: "flex-start",
  },
  logo: {
    width: 40,
    height: 40,
    // backgroundColor: "#7F1D1D",
    // borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
  },
  logoImage: {
    height: "auto",
    width: "100%",
  },
  companyInfo: {
    flexDirection: "column",
  },
  companyName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 3,
  },
  supportEmail: {
    fontSize: 10,
    color: "#6B7280",
  },
  sectionHeader: {
    display: "flex",
    gap: 10,
    flexDirection: "column",
    marginTop: 10,
    marginBottom: 15
  },
  rightHeader: {
    alignItems: "flex-end",
  },
  receiptTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7F1D1D",
    marginBottom: 8,
  },
  receiptNumber: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 12,
  },
  billToLabel: {
    fontSize: 10,
    color: "#7F1D1D",
    fontWeight: "bold",
    marginBottom: 3,
  },
  billToName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#374151",
    marginBottom: 2,
  },
  billToEmail: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 8,
  },
  date: {
    fontSize: 10,
    color: "#6B7280",
    marginBottom: 8,
  },
  paidBadge: {
    backgroundColor: "#0A5438",
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7F1D1D",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 11,
    color: "#6B7280",
    flex: 1,
  },
  detailValue: {
    fontSize: 11,
    color: "#374151",
    textAlign: "right",
    flex: 1,
  },
  detailValueBold: {
    fontSize: 11,
    color: "#374151",
    fontWeight: "bold",
    textAlign: "right",
    flex: 1,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical: 10,
  },
  locationValue: {
    fontSize: 11,
    color: "#374151",
    textAlign: "right",
    flex: 2,
  },
  transactionId: {
    fontSize: 9,
    color: "#374151",
    textAlign: "right",
    flex: 1,
    fontFamily: "Courier",
  },
  totalSection: {
    backgroundColor: "#F9FAFB",
    padding: 15,
    marginTop: 20,
    marginBottom: 25,
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#7F1D1D",
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A5438",
  },
  footer: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 5,
  },
  footerTextBold: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 5,
  },
  footerTextItalic: {
    fontSize: 10,
    color: "#6B7280",
    textAlign: "center",
    fontStyle: "italic",
  },
});

// PDF Document Component

export const ReceiptPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        {/* Left side - Company info */}
        <View style={styles.leftHeader}>
          <View style={styles.logo}>
            <Image src={Logo} style={styles.logoImage} />
            {/* <Text style={styles.logoText}>h</Text> */}
          </View>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>HevSuite Club</Text>
            <Text style={styles.supportEmail}>support@hevsuite.com</Text>
          </View>
        </View>

        {/* Right side - Receipt info */}
        <View style={styles.rightHeader}>
          <Text style={styles.receiptTitle}>Receipt</Text>
          <Text style={styles.receiptNumber}>{data.receiptNumber}</Text>

          <Text style={styles.billToLabel}>Bill To:</Text>
          <Text style={styles.billToName}>{data.billTo.name}</Text>
          <Text style={styles.billToEmail}>{data.billTo.email}</Text>

          <Text style={styles.date}>{data.date}</Text>

          {data.isPaid && <Text style={styles.paidBadge}>PAID</Text>}
        </View>
      </View>

       <Line style={styles.line} />

      {/* Event Details Section */}
      {/* <Text style={styles.sectionTitle}>Event Details</Text>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Event Name</Text>
        <Text style={styles.detailValueBold}>{data.event.name}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Date & Time</Text>
        <Text style={styles.detailValue}>{data.event.dateTime}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Location</Text>
        <Text style={styles.locationValue}>{data.event.location}</Text>
      </View> */}

      {/* Purchase Details Section */}
      <View style={styles.sectionHeader} >
        <Text style={styles.sectionTitle}>Purchase Details</Text>
        <Line style={{...styles.line, marginVertical: 0 }} />
      </View>


      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Paid By </Text>
        <Text style={styles.detailValue}>{data.purchase.paidBy}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Payment For</Text>
        <Text style={styles.detailValue}>
          {data.purchase.paymentFor}
        </Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Amount </Text>
        <Text style={styles.detailValue}>{data.purchase.amount}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Payment Method</Text>
        <Text style={styles.detailValue}>{data.purchase.paymentMethod}</Text>
      </View>

      <View style={styles.detailRow}>
        <Text style={styles.detailLabel}>Transaction ID</Text>
        <Text style={styles.transactionId}>{data.purchase.transactionId}</Text>
      </View>

      {/* Total Amount Section */}
      <View style={styles.totalSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Amount Paid</Text>
          <Text style={styles.totalAmount}>{data.totalAmount}</Text>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerTextBold}>Thank you for your purchase!</Text>
        <Text style={styles.footerText}>
          For support or inquiries, contact us at support@hevsuite.com
        </Text>
        <Text style={styles.footerTextItalic}>
          HevSuite Club - Building Communities Through Events
        </Text>
      </View>
    </Page>
  </Document>
);

// Main component with download functionality
// export default function PDFReceiptGenerator() {
//   // Sample data matching the image
//   // sample data
//   const receiptData = {
//     receiptNumber: "#RCP-1750696461238",
//     billTo: {
//       name: "Boluwatifeeee Omolayo",
//       email: "omolayodaniel100@gmail.com",
//     },
//     date: "23/06/2025, 17:34:21",
//     isPaid: true,
//     event: {
//       name: "hangout",
//       dateTime: "29/06/2025, 11:50:00",
//       location: "Brighton, Brighton and Hove, England, BN1 1HH, United Kingdom",
//     },
//     purchase: {
//       paidBy: "Boluwatifeeee Omolayo",
//       paymentFor: "Membership Fee",
//       paymentMethod: "stripe",
//       amount: 40,
//       transactionId: "pi_3RdDJyLjCXJE3TZU1XgdNTfr",
//     },
//     totalAmount: 60.0,
//   };

//  return null
// }
