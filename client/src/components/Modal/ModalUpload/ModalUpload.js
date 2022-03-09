import './ModalUpload.scss';

import { useMutation } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { Button, Dimmer, Icon, Loader, Modal } from 'semantic-ui-react';

import { PUBLISH } from '../../../gql/publication';

// import { Modal, Icon, Button, Dimmer, Loader } from "semantic-ui-react";
export default function ModalUpload(props) {
    const { show, setShow } = props;
    const [fileUpload, setFileUpload] = useState(null);
    const [publish] = useMutation(PUBLISH);
    const [isLoading, setIsLoading] = useState(false);


    const onDrop = useCallback((acceptedFile) => {
        const file = acceptedFile[0];
        setFileUpload({
            type: "image",
            file,
            preview: URL.createObjectURL(file),
        })      
    });

    const { getRootProps, getInputProps} = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        multiple: false,
        onDrop,
    })
    const onClose = () => {
        setIsLoading(false);
        setFileUpload(null);
        setShow(false);
    }

    const onPublish = async() => {
        try {
            setIsLoading(true);
            const file = fileUpload.file;
            const result = await publish({ variables: { file } });
            const { data } = result;
            if (!data.publish.status) {
                toast.warning("Error en la publicacion");
                setIsLoading(false);
            } else {
                onClose();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal
            size="small"
            open={show}
            onClose={onClose}
            className="modal-upload"
        >
            <div
                {...getRootProps()}
                className="dropzone"
                style={fileUpload && { border: 0 }}
            >
                {!fileUpload && (
                    <>
                        <Icon name="cloud upload"></Icon>
                        <p>Arrastra la foto que quieras publicar</p>
                    </>
                )}

                <input {...getInputProps()} />
            </div>

            {fileUpload?.type === "image" && (
                <div
                    className="image"
                    style={{ backgroundImage: `url("${fileUpload.preview}")` }}
                ></div>
            )}

            {fileUpload && (
                <Button className="btn-upload btn-action" onClick={onPublish}>
                    Publicar
                </Button>
            )}
            {isLoading && (
                <Dimmer active className="publishing">
                    <Loader />
                    <p>Publicando...</p>
                </Dimmer>
            )}
        </Modal>
    );
}
