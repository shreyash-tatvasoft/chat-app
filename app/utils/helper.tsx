export const ApiResponse = (status: number, data: any) => {
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
      status,
    });
  };