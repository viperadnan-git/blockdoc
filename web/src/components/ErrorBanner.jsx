import { Alert, AlertDescription, AlertIcon, AlertTitle } from "@chakra-ui/react";

function ErrorBanner({ error }) {
    return (
        <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Error:</AlertTitle>
            <AlertDescription>{error.message}</AlertDescription>
        </Alert>
    );
}

export default ErrorBanner;