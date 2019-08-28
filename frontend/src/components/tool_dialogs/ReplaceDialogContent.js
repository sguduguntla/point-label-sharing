import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SimpleTable from './SimpleTable';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginBottom: theme.spacing(2)
    },
    dense: {
      marginTop: theme.spacing(1),
    },
    menu: {
      width: 200,
    },
    margin: {
        margin: theme.spacing(1),
    }
  }));

const ReplaceDialogContent = (props) => {
    const { previewData, selectedCols, open, handleClose, title, createRule, applyRule  } = props;
    const classes = useStyles();

    const [wordToFind, setWordToFind] = React.useState("");
    const [wordToReplace, setWordToReplace] = React.useState("");

    console.log(selectedCols);
    function handleApplyRule(e) {
        createRule({
            templateId: "replace",
            data: {
                'cols': selectedCols,
                'args': [false, "abc", "SAI"]
            }
        }).then(res => {
            applyRule({
                ruleId: res.rules.response.ruleid,
                fileId: "58063"
            }).then(() => {
                alert("DONE");
            });
        });

        handleClose();

        console.log(wordToFind, wordToReplace);
    }
   
    return (

        <Dialog fullWidth={true} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText color="textPrimary">
                Replace all occurrences of the specified phrases.
                </DialogContentText>
                <form className={classes.container} noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="outlined-dense"
                            label="Find"
                            className={clsx(classes.textField, classes.dense)}
                            margin="dense"
                            variant="outlined"
                            onChange={(e) => setWordToFind(e.target.value)}
                        />
                        <TextField
                            id="replace"
                            label="Replace"
                            className={clsx(classes.textField)}
                            margin="dense"
                            variant="outlined"
                            onChange={(e) => setWordToReplace(e.target.value)}
                        />
                    </div>
                   
                    <Fab size="small" color="primary" aria-label="add" className={classes.margin}>
                        <AddIcon />
                    </Fab>
                </form>
                <DialogContentText color="textPrimary" variant="h6">
                    PREVIEW:

                </DialogContentText>
                { selectedCols.length > 0 ? <SimpleTable findAndReplaceWords={[wordToFind, wordToReplace]} previewData={previewData} /> : "First, choose the columns you would like to replace."} 
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleApplyRule} color="primary">
                    Apply Rule
                </Button>
            </DialogActions>
        </Dialog>        
    );
}

export default connect(null, actions)(ReplaceDialogContent);