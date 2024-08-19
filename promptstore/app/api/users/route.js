
export async function GET(request) {

    const users = [
        {id:1, name: "john"},
        {id:2, name: "johny"},
        {id:3, name: "johnardan"},
    ]

    return new Response(JSON.stringify(users))
    
}