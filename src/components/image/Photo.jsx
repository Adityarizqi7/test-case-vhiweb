import PropTypes from 'prop-types'
import ProgressiveImage from 'react-progressive-graceful-image';

import 'lightgallery/scss/lightgallery-bundle.scss'

import LightImage from './LightImage';

export default function Photo({path, alt, className, caption}) {
    return (
        <LightImage
            path={path}
            caption={caption}
        >
            <ProgressiveImage src={path} placeholder={path}>
            {(src, loading) => {
                return (
                    <div className={`overflow-hidden relative ${className}`}>
                        <img 
                            style={{
                                opacity:
                                    loading
                                        ? 0.5
                                        : 1,
                            }}
                            className={`progressive-image object-cover cursor-pointer hover:scale-[1.5] transition-transform " ${className}`} src={src} alt={alt}
                        />
                        <noscript>
                            <img 
                                style={{
                                    opacity:
                                        loading
                                            ? 0.5
                                            : 1,
                                }}
                                className={`progressive-image no-script object-cover cursor-pointer hover:scale-[1.5] transition-transform ${className}`} src={src} alt={alt} 
                            />
                        </noscript>
                    </div>
                );
            }}
            </ProgressiveImage>
        </LightImage>
    )
}

Photo.propTypes= {
    alt: PropTypes.string,
    path: PropTypes.string,
    caption: PropTypes.string,
    className: PropTypes.string,
}