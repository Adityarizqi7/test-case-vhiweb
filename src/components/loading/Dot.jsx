import PropTypes from 'prop-types';

import '../../styles/components/loading/_dot.scss';
    
export default function Dot({className, classDot}) {
    return (
        <section className={`dot-wave-container ${className}`}>
            <div className={`dot-wave dot-wave-1 ${classDot}`}></div>
            <div className={`dot-wave dot-wave-2 ${classDot}`}></div>
            <div className={`dot-wave dot-wave-3 ${classDot}`}></div>
        </section>
    )
}

Dot.propTypes= {
    className: PropTypes.string,
    classDot: PropTypes.string,
}