import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import * as PIXI from 'pixi.js';
import TWEEN from 'tween.js';
import Button from '@material-ui/core/Button';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import Typography from '@material-ui/core/Typography';
import Tink from 'vendor/tink';
import SpriteUtilities from 'vendor/spriteUtilities';
import SelectMapSate from './SelectMapStep';
import styles from './styles';
import SelectMapStep from './SelectMapStep';
import BuildTeamsStep from './BuildTeamsStep';
// import TeamCard from '../../components/TeamCard';

function BattleMap(props) {
  const classes = styles();
  const { battle } = props;
  const [canvasMap, setCanvasMap] = useState(null);

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

    const su = new SpriteUtilities(PIXI);
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

        const getAimSprite = (w, h, halfLen = 10) => {
          const line = new PIXI.Graphics();
          line.lineStyle(4, 0xFF0000, 1);
          line.moveTo(w / 2 - halfLen, h / 2);
          line.lineTo(w / 2 + halfLen, h / 2);
          line.lineTo(w / 2, h / 2);
          line.lineTo(w / 2, h / 2 - halfLen);
          line.lineTo(w / 2, h / 2 + halfLen);
          return line;
        };

        const getSelectionSprite = (w, h) => {
          const rect = new PIXI.Graphics();
          rect.beginFill(0xFF0000);
          rect.lineStyle(4, 0xFF0000, 0.5);
          rect.drawRect(2, 2, w - 2, h - 2);
          rect.endFill();
          rect.alpha = 0.5;

          return rect;
        };


        const spriteWidth = tileMap[0][0].width;
        const spriteHeight = tileMap[0][0].height;
        const selection = getSelectionSprite(spriteWidth, spriteHeight);
        selection.x = xOffset;
        selection.y = yOffset;

        app.stage.addChild(selection);

        const aim = getAimSprite(spriteWidth, spriteHeight);
        aim.x = xOffset + spriteWidth;
        aim.y = yOffset + spriteHeight;
        app.stage.addChild(aim);

        const blurFilter = new PIXI.filters.BlurFilter();
        blurFilter.blur = 5;

        tileMap[1][1].filters = [blurFilter];

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

        const tink = new Tink(PIXI, app.view);

        const pointer = tink.makePointer();
        pointer.tap = () => console.log('The pointer was tapped');
        pointer.press = () => console.log('The pointer was pressed');
        tink.makeDraggable(tileMap[0][0]);

        const upKey = tink.keyboard(13);
        upKey.press = () => {
          tileMap[0][0].y -= 1;
        };


        tink.makeInteractive(tileMap[1][1]);
        tileMap[1][1].press = () => {
          console.log('press');
          tileMap[1][1].tint += 1;
        };

        // /const tween = new TWEEN.Tween(tileMap[1][1].position)
        const tween = new TWEEN.Tween({ x: 10, y: 0 })
          .to({ x: 0, y: 0 }, 1000)
          .easing(TWEEN.Easing.Quadratic.In)
          .onUpdate(function (obj) {
            // console.log(JSON.stringify(obj));
            console.log(`${this.x} ${this.y}`);
            // tileMap[2][2].x = coord.x;
            // tileMap[2][2].y = coord.y;
          });
        tween.repeat(3);
        tween.start();

        // Listen for frame updates
        app.ticker.add((delta) => {
          TWEEN.update();
          tink.update();
          if (pointer.hitTestSprite(tileMap[0][0])) {
            console.log('hit');
            pointer.cursor = 'wait';
          } else {
            pointer.cursor = 'auto';
          }
          // each frame we spin the bunny around a bit
          // visible = !visible;
          // tile.rotation += delta * 0.1;
        });
      });
  }, [canvasMap]);
  return (
    <>
      <Paper elevation={3} classes={{ root: classes.battleMapBlock }}>
        <Grid container spacing={1} classes={{ root: classes.battleMapGrid }}>
          <Grid item xs={1}>
            <Typography>Go:</Typography>
            <Typography>Fire:</Typography>

          </Grid>
          <Grid item xs={1}>
            <Typography>?</Typography>
            <Typography>?</Typography>

          </Grid>
          <Grid item xs={10}>
            <Box className={classes.mapBox}>
              <div ref={(element) => setCanvasMap(element)} style={{ height: '100%', width: '100%', position: 'relative' }}></div>
            </Box>
          </Grid>
        </Grid>
        <Fab color="primary" aria-label="add" classes={{ root: classes.fab }}>
          <DirectionsRunIcon />
        </Fab>

      </Paper>
    </>
  );
}
BattleMap.propTypes = {
  battle: PropTypes.object,
};

export default BattleMap;
