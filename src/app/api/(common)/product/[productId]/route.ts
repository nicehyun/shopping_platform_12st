import { AxiosError } from "axios"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { productId: string } }
) {
  const productId = params.productId

  if (!productId) {
    throw new Error(`🚨 Not Product id!`)
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DB_URL}/productList/${productId}`,
      {
        next: { revalidate: 10000 },
      }
    ).then((res) => res.json())

    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    const { response } = error as unknown as AxiosError
    if (response) {
      console.error(
        `🚨 JSON SERVER GET API (Get Product Detail Info) : ${response.data}`
      )
      return new NextResponse(null, { status: response.status })
    } else {
      console.error(`🚨 Unexpected Error (Get Product Detail Info) : ${error}`)
    }

    return new NextResponse(null, { status: 500 })
  }
}
