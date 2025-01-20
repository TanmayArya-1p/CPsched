import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';

async function updateFCMToken() {
    const response = await fetch('https://example.com/api/fcm-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
    });
    return response.ok;
}

const subscriptionStatusAtom = atom({
    key: 'subscriptionStatusAtom',
    default: selector({
        key: 'subscriptionStatusSelector',
        get: async () => {
            const response = await (async () => {
                updateFCMToken()
                let resp = await fetch("ehrjrj")
                return resp
            })
            const data = await response.json();
            return data.status;
        },
    })
});


module.exports = {subscriptionStatusAtom};


