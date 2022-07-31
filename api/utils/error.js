//CUSTOM ERROR HANDLER 
export const createError = (status, message) => {

    const err = new Error()
    err.status = status || 500
    err.message = message || "Something went wrong"

    return err;
}
