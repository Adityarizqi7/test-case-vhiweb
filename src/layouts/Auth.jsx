import PropTypes from 'prop-types';
import { Helmet, HelmetProvider } from 'react-helmet-async'

import ButtonToTop from '@/components/button/ButtonToTop'

const Auth = ({
        title = 'Frontend Developer Test Case - Aditya Rizqi Ardhana',
        kw = 'test case, test case id, test case indonesia',
        desc = 'Frontend Developer Test Case - Aditya Rizqi Ardhana',
        children
    }) => {
    return (
        <HelmetProvider>
            <Helmet prioritizeSeoTags>
                <title>{title}</title>

                <meta name='keywords' value={kw} />
                <meta name='description' value={desc} />
                <link rel='preconnect' href='https://fonts.googleapis.com' />
                <link
                    rel='preconnect'
                    href='https://fonts.gstatic.com'
                    crossOrigin
                />
                <link
                    href='https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap'
                    rel='stylesheet'
                />
            </Helmet>

            {children}

            <ButtonToTop />
        </HelmetProvider>
    )
}

Auth.propTypes= {
    title: PropTypes.string.isRequired,
    kw: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    children: PropTypes.any,
}

export default Auth