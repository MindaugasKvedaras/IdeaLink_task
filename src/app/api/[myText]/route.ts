import { NextRequest, NextResponse } from 'next/server';

interface RequestBody {
  text: string;
  letterToRemove: string;
}

export async function POST(req: NextRequest, { params }: { params: { myText: string }}) {

  const body = await req.json();
  const { letterToRemove } = body as RequestBody;
  
  const text = params.myText;

  // Remove the specified letter from the text
  const modifiedText = text.replace(new RegExp(letterToRemove, 'gi'), '');
  
  var errorText = '';

  if(letterToRemove.length === 1) {
    return new NextResponse(
      JSON.stringify({
        success: true,
        data: modifiedText
      }),
      {
        headers: {
          'ReturnText': modifiedText
        }
      }
    );
  }

  if (letterToRemove.length > 1) {
    errorText = "letterToRemove must be exactly one character long.";
    return new NextResponse(
      JSON.stringify({
        success: false,
        data: errorText
      }),
      {
        headers: {
          'ReturnText': errorText
        }
      }
    );
  };
};
