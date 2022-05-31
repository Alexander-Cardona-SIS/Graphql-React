import './CommentForm.scss';

import React from 'react';
import { Button, Form } from 'semantic-ui-react';


export default function CommentForm(props) {
    const { publication } = props;
    
    return (
        <Form className="comment-form">
            <Form.Input placeholder="Añade un comentario..." name="comment" />
            <Button type="submit">Publicar</Button>
        </Form>
    );
}
