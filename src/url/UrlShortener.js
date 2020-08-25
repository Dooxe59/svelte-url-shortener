const unknownError = 'An unknown error has occurred';

const getErrorMessage = (data) => {
    if (!data) {
        return unknownError;
    }

    if (!data.hashid) {
        return data.url && data.url[0] || unknownError;
    }

    return '';
}

export const newBaseUrl = 'https://rel.ink/';

export const shortenUrl = (url) => {
    if (!url) return;

    const options = {
        method: 'POST',
        body: JSON.stringify({
            url,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    return fetch('https://rel.ink/api/links/', options)
        .then(res => {
            return res.json();
        })
        .then(data => {
            const errorMessage = getErrorMessage(data);
            if (errorMessage) {
                throw new Error(errorMessage);
            }

            return newBaseUrl + data.hashid;
        });
}