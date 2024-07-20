import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export function errorHandler (message = "Internal server error", statusCode = 500) {
    // Ensure statusCode is a valid number between 200 and 599
    const validStatusCode = Number.isInteger(statusCode) && statusCode >= 200 && statusCode <= 599 ? statusCode : 500;

    return NextResponse.json({
        success: false,
        message
    }, { status: validStatusCode });
};

// export const asyncError = (passedFunc) => (req, res) => {
//     return Promise.resolve(passedFunc(req, res)).catch((err) => {
//       return errorHandler(res, 500, err.message);
//     });
//   };

export const asyncError = (passedFunc) => async (req) => {
  try {
      return await passedFunc(req);
  } catch (err) {
      return errorHandler(NextResponse.next(), 500, err.message);
  }
};

export function middleware(req){
    console.log("hello");
    // if(req.url == 'http://localhost:3000/api/mytask') console.log('cookie ', cookies().get('todo').value);;
}

