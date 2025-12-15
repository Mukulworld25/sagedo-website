const testOrder = async () => {
    try {
        console.log('Testing Order Creation...');
        const res = await fetch('https://sagedo-website.onrender.com/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customerName: 'Final Verification',
                customerEmail: 'final@example.com',
                serviceName: 'Supabase Verification',
                requirements: 'It works!'
            })
        });
        const text = await res.text();
        console.log('Status:', res.status);
        console.log('Body:', text);
    } catch (e) { console.log(e); }
};
testOrder();
