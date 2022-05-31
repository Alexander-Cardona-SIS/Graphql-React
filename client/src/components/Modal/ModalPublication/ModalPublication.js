import './ModalPublication.scss';

import React from 'react';
import { Grid, Modal } from 'semantic-ui-react';

import CommentForm from './CommentForm';

export default function ModalPublication(props) {
    const { show, setShow, publication } = props;
    
    const onClouse = () => setShow(false);
    return (
        <Modal open={show} onClose={onClouse} className="modal-publication">
            <Grid>
                <Grid.Column className="modal-publication__left" width={10} style={{ backgroundImage: `url("${publication.file}")`} } />

                <Grid.Column className="modal-publication__right" width={6}>
                    <div>Comentarios</div>
                    <div>Actions</div>
                    <CommentForm publication={ publication } />
                </Grid.Column>
            </Grid>
        </Modal>
    );
}
