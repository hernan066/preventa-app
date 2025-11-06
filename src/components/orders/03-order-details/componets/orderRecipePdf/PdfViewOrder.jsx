import { Document, Page, Text, View } from "@react-pdf/renderer";
import { dateToLocalDate } from "../../../../../utils/dateFormat";
import { formatPrice } from "../../../../../utils/formatPrice";

export const PdfViewOrder = ({ order, unpaidOrders, superUserData }) => {
  const totalDebt = unpaidOrders.reduce(
    (acc, curr) => acc + curr.payment.debt,
    0
  );

  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 25,
            width: "100%",
          }}
        >
          <Text
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {superUserData ? superUserData.businessName : ""}
          </Text>
          <Text
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {superUserData ? superUserData.city : ""}
          </Text>
          <Text
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {superUserData ? superUserData.address : ""}
          </Text>
          <View
            style={{
              display: "flex",
              width: "100%",
              marginTop: "40px",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
              {order.shippingAddress.name +
                " " +
                order.shippingAddress.lastName}
            </Text>
            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
              {dateToLocalDate(order.createdAt)}hs
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
              Teléfono {order.shippingAddress.phone}
            </Text>
            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
              ID {order._id}
            </Text>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
              {order.shippingAddress.address}
            </Text>
            <Text style={{ fontSize: "13px", fontWeight: "bold" }}></Text>
          </View>
          <View
            style={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
              {order.shippingAddress.city}
            </Text>
            <Text style={{ fontSize: "13px", fontWeight: "bold" }}></Text>
          </View>

          <View
            style={{
              display: "flex",
              width: "100%",
              borderBottom: "1px solid #ccc",
              padding: "10px 0",
              marginTop: "30px",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontSize: "11px",
                flex: 0.3,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Cant.
            </Text>
            <Text
              style={{
                fontSize: "11px",
                flex: 2.9,
                fontWeight: "bold",
                textAlign: "left",
              }}
            >
              Producto
            </Text>
            <Text
              style={{
                fontSize: "11px",
                flex: 1,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Unidad
            </Text>
            <Text
              style={{
                fontSize: "11px",
                flex: 1,
                fontWeight: "bold",
                textAlign: "right",
              }}
            >
              Total
            </Text>
          </View>
          {order.orderItems.map((product) => (
            <View
              style={{
                display: "flex",
                width: "100%",
                borderBottom: "1px solid #ccc",
                padding: "10px 0",
                flexDirection: "row",
              }}
            >
              <Text
                style={{ fontSize: "11px", flex: 0.3, textAlign: "center" }}
              >
                {product.totalQuantity}
              </Text>
              <Text style={{ fontSize: "11px", flex: 2.9, textAlign: "left" }}>
                {product.name}
              </Text>
              <Text style={{ fontSize: "11px", flex: 1, textAlign: "center" }}>
                {formatPrice(product.unitPrice)}
              </Text>
              <Text style={{ fontSize: "11px", flex: 1, textAlign: "right" }}>
                {formatPrice(product.totalPrice)}
              </Text>
            </View>
          ))}
          <View style={{ paddingLeft: "50%", width: "100%" }}>
            <View
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                padding: "5px 0",
                marginTop: "12px",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                Subtotal
              </Text>
              <Text style={{ fontSize: "13px" }}>
                {formatPrice(order.subTotal)}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                width: "100%",
                borderBottom: "1px solid #ccc",
                padding: "5px 0",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                Envio
              </Text>
              <Text style={{ fontSize: "13px" }}>
                {order.tax ? formatPrice(order.tax) : formatPrice(0)}
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                width: "100%",
                flexDirection: "row",
                padding: "5px 0",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: "14px", fontWeight: 800, marginTop: "4px" }}
              >
                Total
              </Text>
              <Text
                style={{ fontSize: "14px", fontWeight: 800, marginTop: "4px" }}
              >
                {formatPrice(order.total)}
              </Text>
            </View>
          </View>
          {unpaidOrders.length > 0 ? (
            <>
              <View
                style={{
                  margin: "30px",
                  backgroundColor: "#ccc",
                  height: "1px",
                  width: "100%",
                }}
              ></View>
              <Text style={{ fontSize: "15px", fontWeight: "bold" }}>
                Ordenes adeudadas
              </Text>
              <View
                style={{
                  display: "flex",
                  width: "100%",
                  borderBottom: "1px solid #ccc",
                  padding: "10px 0",
                  marginTop: "30px",
                  flexDirection: "row",
                }}
              >
                <Text
                  style={{
                    fontSize: "11px",
                    flex: 1,
                    fontWeight: "bold",
                    textAlign: "left",
                  }}
                >
                  Fecha de entrega
                </Text>

                <Text
                  style={{
                    fontSize: "11px",
                    flex: 1,
                    fontWeight: "bold",
                    textAlign: "right",
                  }}
                >
                  Valor adeudado
                </Text>
              </View>
              {unpaidOrders.map((order) => (
                <View
                  style={{
                    display: "flex",
                    width: "100%",
                    borderBottom: "1px solid #ccc",
                    padding: "10px 0",
                    flexDirection: "row",
                  }}
                >
                  <Text
                    style={{ fontSize: "11px", flex: 1, textAlign: "left" }}
                  >
                    {dateToLocalDate(order.deliveryDate)}hs
                  </Text>

                  <Text
                    style={{ fontSize: "11px", flex: 1, textAlign: "right" }}
                  >
                    {formatPrice(order.payment.debt)}
                  </Text>
                </View>
              ))}
              <View style={{ paddingLeft: "50%", width: "100%" }}>
                <View
                  style={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "row",
                    padding: "5px 0",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      marginTop: "4px",
                    }}
                  >
                    Total adeudado
                  </Text>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontWeight: 800,
                      marginTop: "4px",
                    }}
                  >
                    {formatPrice(totalDebt)}
                  </Text>
                </View>
              </View>
            </>
          ) : null}
        </View>
      </Page>
    </Document>
  );
};
