const handleError = (errors) => {
    const err = {}
    if(errors.message === "Invalid Credentials"){
        err.email = "Invalid email address"
        err.password = "Invalid password"
        return err
    }
    if(errors.message === "Account not found"){
        err.email = "No User is found registered with specified email address, provide a valid email address"
        return err
    }
    if(errors.message === "Account already exist"){
        err.email = "Email already in use, provide another email address to continue registration"
        return err
    }
}

module.exports = handleError