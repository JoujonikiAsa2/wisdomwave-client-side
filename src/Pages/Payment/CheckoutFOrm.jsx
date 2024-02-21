import { AddressElement, CardElement } from '@stripe/react-stripe-js';
import { Link } from 'react-router-dom';

const CheckoutForm = () => {

    return (
        <form>
            {/* check out form  */}
            <CardElement className='max-w-[850px] border-2 border-orange-300 rounded-lg p-2'>
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
                <AddressElement></AddressElement>
            </CardElement>
            
            <div className=''>
                <Link to="/myCourse">
                    <button className='btn text-white btn-sm capitalize bg-gradient-to-r from-[#29ADB2] to-[#0766AD] hover:bg-gradient-to-t hover:from-[#0766AD] hover:to-[#29ADB2]' type="submit">
                        Pay
                    </button>
                </Link>
            </div>
        </form>
    );
};

export default CheckoutForm;