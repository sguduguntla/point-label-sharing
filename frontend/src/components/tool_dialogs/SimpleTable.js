import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  }
}));

export default function SimpleTable(props) {
  const { previewData, trimRange, findAndReplaceWords, delimeterAndSection, onSectionClicked, wordToFind } = props;

  const classes = useStyles();
  
  const columnNames = previewData[0];
  let rows = [];

  if (trimRange) {
    rows = previewData.slice(1).map(row => {
        return row.map(value => {
            return value.substring(trimRange[0], trimRange[1]);
        });
      });
  } else if (findAndReplaceWords) {
    rows = previewData.slice(1).map(row => {
      return row.map(value => {
          const re = new RegExp(escapeRegExp(findAndReplaceWords[0]), 'g');
          return value.replace(re, findAndReplaceWords[1]);
      });
    });
  } else if (delimeterAndSection) {
    rows = previewData.slice(1, 2).map(row => {
      return row.map(value => {
        if (delimeterAndSection[0]) {
          return value.split(delimeterAndSection[0]).join(" | ");
        } else {
          return value;
        }
      });
    });
  } else if (wordToFind) {
    rows = previewData.slice(1).map(row => {
      return row.map(value => {
          const re = new RegExp(escapeRegExp(wordToFind), 'g');
          return value.replace(re, "");
      });
    });
  } else {
    rows = previewData.slice(1);
  }

  function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1");
  }

  function handleSectionClick(e, sectionIdx) {
    onSectionClicked(sectionIdx);
  }
  
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {columnNames.map((columnName, index) => {
                return <TableCell key={index}>{columnName}</TableCell>;
            })}
            </TableRow>
        </TableHead>
        <TableBody>
            {rows.map((row, index) => {
                return (
                <TableRow key={index}>
                    {row.map((value,colIdx) => {
                      if (delimeterAndSection && delimeterAndSection[0]) {
                        return (
                          <TableCell key={colIdx} component="th" scope="row">
                            <ButtonGroup variant="contained" size="small" aria-label="small contained button group">
                              {value.split(" | ").map((sectionValue, sectionIdx) => {
                                return <Button onClick={e => handleSectionClick(e, sectionIdx)} key={sectionIdx}>{sectionValue}</Button>;
                              })}
                            </ButtonGroup>
                          </TableCell>);
                      } else {
                        return(
                            <TableCell key={colIdx} component="th" scope="row">
                              {value}
                            </TableCell>
                        );
                      }
                    })}
                </TableRow>);
            })}
            <TableRow>
                <TableCell component="th" scope="row">...</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}