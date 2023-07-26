import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import TopBar from '@/components/navbar/TopBar';
import ButtonToTop from '@/components/button/ButtonToTop'
import { getCookie } from '@/utils/cookie';

const TestCase = ({
        title = 'Frontend Developer Test Case - Aditya Rizqi Ardhana',
        kw = 'test case, test case id, test case indonesia',
        desc = 'Frontend Developer Test Case - Aditya Rizqi Ardhana',
        children
    }) => {

    const navigate = useNavigate()

    useEffect(() => {
        !getCookie('auth_token') && navigate('/')
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

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

            <TopBar />
            {children}

            <ButtonToTop />
        </HelmetProvider>
    )
}

TestCase.propTypes= {
    title: PropTypes.string.isRequired,
    kw: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    children: PropTypes.any,
}

export default TestCase