import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Stepper from '@material-ui/core/Stepper';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import * as PIXI from 'pixi.js';
import { range } from 'lodash';

import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';

import styles from './styles';
// import TeamCard from '../../components/TeamCard';

function SelectMapStep(props) {
  const classes = styles();

  const [map, setMap] = useState(null);
  const [mapSize, setMapSize] = useState(null);
  const [canvasMap, setCanvasMap] = useState(null);

  const mapSizes = ['small', 'medium', 'large'];

  useEffect(() => {
    if (canvasMap === null) {
      return;
    }
    // The application will
    // /  create a renderer using WebGL, if possible,
    // with a fallback to a canvas render. It will also setup the ticker
    // and the root stage PIXI.Container.
    const app = new PIXI.Application({
      width: canvasMap.clientWidth,
      height: canvasMap.clientHeight,
      autoResize: true,
      antialias: true,
      transparent: false,
      resolution: 1,
    });
    // /    app.renderer.backgroundColor = 0x061677;
    //    app.renderer.autoResize = true;
    //    app.renderer.resize(256, 256);s
    // The application will create a canvas element for you that you
    // can then insert into the DOM.
    canvasMap.appendChild(app.view);

    // function resize() {
    //   const parent = app.view.parentNode;

    //   app.renderer.resize(parent.clientWidth, parent.clientHeight);
    // }

    // resize();
    // load the texture we need
    const loader = new PIXI.Loader();
    const img = '/image/tile/field/field_1.png';
    loader.add('tile', img)
      .on('progress', (loader, resouce) => {
        console.log(`loading${loader.progress}`);
      })
      .load((loader, resources) => {
        // This creates a texture from a 'bunny.png' image.
        // const bunny = new PIXI.Sprite(resources['bunny'].texture);
        // const rectangle = new PIXI.Rectangle(0, 0, 256, 128);

        const texture = PIXI.utils.TextureCache.tile;
        // texture.frame = rectangle;

        // const tile = new PIXI.Sprite(texture);

        const xSize = 10;
        const ySize = 3;

        const xOffset = (app.renderer.width - texture.width * xSize) / 2;
        const yOffset = (app.renderer.height - texture.height * ySize) / 2;

        const tileMap = [];
        const playerPositions = [[2, 2], [5, 1]];
        // eslint-disable-next-line no-plusplus
        for (let x = 0; x < xSize; x++) {
          tileMap[x] = [];
          // eslint-disable-next-line no-plusplus
          for (let y = 0; y < ySize; y++) {
            tileMap[x][y] = new PIXI.Sprite(texture);
            tileMap[x][y].x = xOffset + texture.width * x;
            tileMap[x][y].y = yOffset + texture.height * y;
            app.stage.addChild(tileMap[x][y]);
          }
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const pos of playerPositions) {
          tileMap[pos[0]][pos[1]].tint = 0xff0000;
        }

        // Setup the position of the bunny
        // tile.x = app.renderer.width / 2;
        // tile.y = app.renderer.height / 2;

        // Rotate around the center

        // tile.anchor.x = 0.5;
        // tile.anchor.y = 0.5;


        // Add the bunny to the scene we are building.


        // const rect = new PIXI.Graphics();
        // rect.beginFill(0x1FF233);
        // rect.drawRect(0, 0, 30, 30);
        // rect.endFill();
        // rect.x = 10;
        // rect.y = 10;
        // app.stage.addChild(rect);


        // const visible = true;
        // Listen for frame updates
        app.ticker.add((delta) => {
          // each frame we spin the bunny around a bit
          // tile.visible = visible;
          // visible = !visible;
          // tile.rotation += delta * 0.1;
        });
      });
  }, [canvasMap]);
  return (
    <Paper elevation={3} classes={{ root: classes.selectMapStep }}>

      <Grid container spacing={1}>
        <Grid item xs={2}>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.formControl}>Map size</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={mapSize}
              onChange={(event) => setMapSize(event.target.value)}
            >
              { mapSizes.map((ms) => <MenuItem value={ms}>{ ms }</MenuItem>) }

            </Select>
          </FormControl>
          <List className={classes.rightBox}>
            { range(5).map((index) => (
              <ListItem selected={map === index} onClick={() => setMap(index)} button key={index.toString()}>
                <ListItemText>{ index }</ListItemText>
              </ListItem>
            )) }
          </List>
        </Grid>
        <Grid item xs={10}>
          <Box className={classes.mapBox}>
            <div ref={(element) => setCanvasMap(element)} style={{ height: '100%', width: '100%' }}></div>
          </Box>

        </Grid>
      </Grid>
      { /* { activeTeams.map((activeTeam, index) => <TeamCard team={activeTeam} key={index.toString()} onConnect={handleConnectTeam} />) } */ }
      { /* <Fab color="primary" aria-label="add" classes={{ root: classes.fab }} onClick={handleCreateTeam}>
          <DirectionsRunIcon />
        </Fab> */ }
    </Paper>
  );
}
SelectMapStep.propTypes = {
  battle: PropTypes.object,
};

export default SelectMapStep;
