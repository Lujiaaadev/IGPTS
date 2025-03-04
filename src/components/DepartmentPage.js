import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import './DepartmentPage.css';

const DepartmentPage = () => {
  const { id } = useParams();
  const [openForm, setOpenForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([
    {
      itemNo: 1,
      projectName: 'Sample Project',
      description: 'Test Description',
      dateRemitted: '2025-03-03',
      amount: 5000,
      receiptNo: 'RCP-001',
      documents: 'sample.pdf'
    }
  ]);
  const [newTransaction, setNewTransaction] = useState({
    projectName: '',
    description: '',
    dateRemitted: '',
    amount: '',
    receiptNo: '',
    documents: null
  });

  const handleAddRemittance = () => {
    const itemNo = transactions.length + 1;
    setTransactions([...transactions, { ...newTransaction, itemNo }]);
    setOpenForm(false);
    setNewTransaction({
      projectName: '',
      description: '',
      dateRemitted: '',
      amount: '',
      receiptNo: '',
      documents: null
    });
  };

  const filteredTransactions = transactions.filter(
    transaction => 
      transaction.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalIGP = filteredTransactions.reduce((sum, trans) => sum + Number(trans.amount), 0);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Department Transactions
      </Typography>
      
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          label="Search Transactions"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
          variant="contained" 
          color="primary"
          onClick={() => setOpenForm(true)}
        >
          Add Remittance
        </Button>
      </Box>

      <Typography variant="h6" gutterBottom>
        Total IGP: ₱{totalIGP.toLocaleString()}
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item No.</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date Remitted</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Receipt No.</TableCell>
              <TableCell>Documents</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.itemNo}>
                <TableCell>{transaction.itemNo}</TableCell>
                <TableCell>{transaction.projectName}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.dateRemitted}</TableCell>
                <TableCell>₱{transaction.amount.toLocaleString()}</TableCell>
                <TableCell>{transaction.receiptNo}</TableCell>
                <TableCell>
                  <Button 
                    variant="text" 
                    color="primary"
                    onClick={() => window.open(transaction.documents)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openForm} onClose={() => setOpenForm(false)}>
        <DialogTitle>Add New Remittance</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Project Name"
            value={newTransaction.projectName}
            onChange={(e) => setNewTransaction({...newTransaction, projectName: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Description"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            type="date"
            label="Date Remitted"
            InputLabelProps={{ shrink: true }}
            value={newTransaction.dateRemitted}
            onChange={(e) => setNewTransaction({...newTransaction, dateRemitted: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Receipt Number"
            value={newTransaction.receiptNo}
            onChange={(e) => setNewTransaction({...newTransaction, receiptNo: e.target.value})}
            margin="normal"
          />
          <input
            type="file"
            onChange={(e) => setNewTransaction({...newTransaction, documents: e.target.files[0]})}
            style={{ marginTop: '16px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleAddRemittance} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentPage;