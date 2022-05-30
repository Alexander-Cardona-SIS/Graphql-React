import './PreviewPublication.scss';

import React, { useState } from 'react';
import { Image } from 'semantic-ui-react';

import ModalPublication from '../../Modal/ModalPublication';

export default function PreviewPublication(props) {
    const { publication } = props;
    const [showModal, setShowModal] = useState(false);
    
    return (
        <>
            <div className="preview-publication" onClick={() => setShowModal(true)} >
                <Image
                    className="preview-publication__image"
                    src={publication.file}
                ></Image>
            </div>
            <ModalPublication
                show={showModal}
                setShow={setShowModal}
                publication={publication}
            ></ModalPublication>
        </>
    );
}
