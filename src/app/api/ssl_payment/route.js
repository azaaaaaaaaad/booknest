
import { NextResponse } from "next/server";


export async function POST() {
  try {
    const tran_id = Math.floor(100000 + Math.random() * 900000).toString();
    const init_url = "https://sandbox.sslcommerz.com/gwprocess/v3/api.php";

    const formData = new FormData();
    formData.append("store_id", "growt670dff341c48a");
    formData.append("store_passwd", "growt670dff341c48a@ssl");
    //
    formData.append("total_amount", "180");
    formData.append("currency", "BDT");
    //
    formData.append("tran_id", `${tran_id}`);
    formData.append(
      "success_url",
      `${process.env.NEXT_PUBLIC_API_URL}/api/success?id=${tran_id}`
    );
    formData.append("fail_url", `${process.env.NEXT_PUBLIC_API_URL}/api/fail?id=${tran_id}`);
    formData.append(
      "cancel_url",
      `${process.env.NEXT_PUBLIC_API_URL}/api/cancel?id=${tran_id}`
    );
    formData.append("ipn_url", `${process.env.NEXT_PUBLIC_API_URL}/api/ipn?id=${tran_id}`);
    //
    formData.append("cus_name", "Siratul Islam");
    formData.append("cus_email", "islamsiratul@gmail.com");
    formData.append("cus_add1", "Mipur 1 Dhaka 1216");
    // formData.append("cus_add2", "Mipur 2 Dhaka 1216");
    formData.append("cus_city", "Dhaka");
    // formData.append("cus_state", "Dhaka");
    formData.append("cus_postcode", "1216");
    formData.append("cus_country", "Bangladesh");
    formData.append("cus_phone", "01916304123");
    // formData.append("cus_fax", "01916304123");
    formData.append("shipping_method", "YES");
    formData.append("ship_name", "Siratul Islam");
    formData.append("ship_add1", "Mipur 1 Dhaka 1216");
    // formData.append("ship_add2", "Mipur 1 Dhaka 1216");
    formData.append("ship_city", "Dhaka");
    // formData.append("ship_state", "Dhaka");
    // formData.append("ship_country", "Bangladesh");
    formData.append("ship_postcode", "1216");
    //
    //
    formData.append("product_name", "T-Shirt");
    formData.append("product_category", "category");
    formData.append("product_profile", "profile");
    formData.append("product_amount", "1");
    //

    const requestOptions = { method: "POST", body: formData };
    let SSLRes = await fetch(init_url, requestOptions);

    let SSLResJSON = await SSLRes.json();

    return NextResponse.json({ data: SSLResJSON });
  } catch (e) {
    return NextResponse.json({ data: e });
  }
}
