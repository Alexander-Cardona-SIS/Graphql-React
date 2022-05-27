import './Publications.scss';

import { map } from 'lodash';
import React from 'react';
import { Grid } from 'semantic-ui-react';

import PreviewPublication from './PreviewPublication/PreviewPublication';

export default function Publications(props) {
    
    const { getpublications } = props;
       

  return (
      <div className="publications">
          <h1>Publicaciones</h1>
          <Grid columns={4}>
              {map(getpublications, (publication, index) => (
                  <Grid.Column key={index}>
                      <PreviewPublication publication={publication} />
                  </Grid.Column>
              ))}
          </Grid>
      </div>
  );
}
