import React from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { Avatar } from '@material-ui/core';
import { _PHOTO } from '../../utils/dir';
import $ from 'jquery';
window.$ = $;


export const Form = () => {
  
  const StyledBadge = withStyles((theme) => ({
		badge: {
		  backgroundColor: '#44b700',
		  color: '#44b700',
		  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		  '&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: '$ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		  },
		},
		'@keyframes ripple': {
		  '0%': {
			transform: 'scale(.8)',
			opacity: 1,
		  },
		  '100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		  },
		},
	  }))(Badge);

    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    }));

    const classes = useStyles();

  $(document).ready(function() {
    
    let $input = $('#input');
    let $content = $('#content');
    let $inner = $('#inner');
    
    function scrollBottom() {
      $($inner).animate({
        scrollTop: $($content).outerHeight(true)
      }, {
        queue: false,
        duration: 'ease'
      });
    }
    scrollBottom()
   
    $input.on('click', function(e) {
      scrollBottom();
    });
  });


return(
    <div>         
        <nav className="nav" id="nav">
            <div className="default-nav">
              <div className={classes.root}>
                  <div className="toggle"></div>
                  <Avatar alt="" src={ _PHOTO } className="avatar" style={{ marginTop: 15, width: 80, height: 80 }} />
              <StyledBadge overlap="circle" anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }} variant="dot"></StyledBadge>
              </div>
            </div>
        </nav>
    </div>
)}