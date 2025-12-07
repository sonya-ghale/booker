// import { NextResponse } from "next/server";

// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

// export async function POST(
//   request: Request,
// ) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const body = await request.json();
//   const {
//     listingId,
//     startDate,
//     endDate,
//     totalPrice
//    } = body;

//    if (!listingId || !startDate || !endDate || !totalPrice) {
//     return NextResponse.error();
//   }

//   const listingAndReservation = await prisma.listing.update({
//     where: {
//       id: listingId
//     },
//     data: {
//       reservations: {
//         create: {
//           userId: currentUser.id,
//           startDate,
//           endDate,
//           totalPrice,
//         }
//       }
//     }
//   });

//   return NextResponse.json(listingAndReservation);
// }

// import { NextResponse } from "next/server";
// // import { loadStripe } from "@stripe/stripe-js";
// const stripe = require("stripe")(process.env.SECRET_KEY);
// // const stripe = await loadStripe(process.env.)

// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

// export async function POST(
//   request: Request,
// ) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const body = await request.json();
//   const {
//     listingId,
//     startDate,
//     endDate,
//     totalPrice
//    } = body;

//    if (!listingId || !startDate || !endDate || !totalPrice) {
//     return NextResponse.error();
//   }

//   const reservation = await prisma.reservation.create({
//     data: {
//       userId: currentUser.id,
//       listingId,
//       startDate,
//       endDate,
//       totalPrice,
//     }
//   });

//   console.log("Reservation data:", reservation);

//   return NextResponse.json(reservation);
// }

// import { NextResponse } from "next/server";
// import { Stripe } from "stripe";
// import prisma from "@/app/libs/prismadb";
// import getCurrentUser from "@/app/actions/getCurrentUser";

// const stripe = new Stripe('sk_test_51Op9hvLN0v7UmgaT3Gb5RRaWYD9Kj7siv8CBCc7KXfVLLzDTHpQgC2rG08D8SzdewfJilz1iqp1RoQ3NS4r3XM4k00GGRzPcLj', {
//   apiVersion: "2023-10-16",
// });

// export async function POST(request: Request) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const body = await request.json();
//   const { listingId, startDate, endDate, totalPrice } = body;

//   if (!listingId || !startDate || !endDate || !totalPrice) {
//     return NextResponse.error();
//   }

//   try {
//     const reservation = await prisma.reservation.create({
//       data: {
//         userId: currentUser.id,
//         listingId,
//         startDate,
//         endDate,
//         totalPrice,
//       },
//     });

//     console.log("Reservation data:", reservation);

//     // Create a Stripe Checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: {
//               name: "Reservation",
//             },
//             unit_amount: totalPrice * 100, // Stripe uses amount in cents
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       // success_url: `${req.headers.origin}/?success=true`,
//       // cancel_url: `${req.headers.origin}/?canceled=true`,
//       // success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?reservationId=${reservation.id}`,
//       // cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
//       success_url: `http://localhost:3000/trips?reservationId=${reservation.id}`,
//       cancel_url: `http://localhost:3000/listings`,
//     });

//     // Redirect the user to the Stripe Checkout page
//     // return NextResponse.redirect(session.url, { status: 303 });
//     if(session && session.url) {
//       return NextResponse.redirect(session.url, { status: 303 });

//     }else{
//       console.error("Failed to create stripe checkout session");
//       return NextResponse.error();
//     }
//   }
// }

// =============================== for now running but cros error
import { NextResponse } from "next/server";
import { Stripe } from "stripe";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

const stripe = new Stripe(
  "sk_test_51Op9hvLN0v7UmgaT3Gb5RRaWYD9Kj7siv8CBCc7KXfVLLzDTHpQgC2rG08D8SzdewfJilz1iqp1RoQ3NS4r3XM4k00GGRzPcLj",
  {
    apiVersion: "2024-06-20",
  }
);

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }

  try {
    const reservation = await prisma.reservation.create({
      data: {
        userId: currentUser.id,
        listingId,
        startDate,
        endDate,
        totalPrice,
      },
    });

    console.log("Reservation data:", reservation);

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Reservation",
            },
            unit_amount: totalPrice * 100, // Stripe uses amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/trips?reservationId=${reservation.id}`,
      cancel_url: `http://localhost:3000/listings`,
    });

    if (session && session.url) {
      return NextResponse.json({ sessionUrl: session.url });
      // return NextResponse.json({sessionId: session.id })
    } else {
      console.error("Failed to create stripe checkout session");
      return NextResponse.error();
    }
  } catch (error) {
    console.error("Error creating reservation:", error);
    return NextResponse.error();
  }
}

// sk_test_51Op9hvLN0v7UmgaT3Gb5RRaWYD9Kj7siv8CBCc7KXfVLLzDTHpQgC2rG08D8SzdewfJilz1iqp1RoQ3NS4r3XM4k00GGRzPcLj
// ==========================================lets see
