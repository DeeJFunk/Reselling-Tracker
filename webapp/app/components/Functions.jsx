// This function is how we send literally every database call
async function apiSearch(n) {
    try {
        const response = await fetch(`http://localhost:8080/api/${n}`);
            if (!response.ok) {
                throw new Error("Could not fetch resource");
            }
            const data = await response.json();
            return data
    } catch(error) {
        console.error(error)
    }
}

export { apiSearch }