import { ArrowDropDown, ArrowDropUp, CalendarMonth, LocationCity, LocationOn, Mail, Person, Phone } from "@mui/icons-material"
import ViewListIcon from '@mui/icons-material/ViewList';
import { useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


interface RequestComponentProps{
    bookingID:string,
    name:string,
    rollno:string,
    hostel:string,
    checkin:string,
    checkout:string,
    type1:string,
    type2:string,
    guest1Name:string,
    guest1Contact:string,
    guest1Email:string,
    guest2Name:string,
    guest2Contact:string,
    guest2Email:string,
}

const hostelLabels: {[key:string]:string | undefined}={
    MHR: 'Mahanadi Hall of Residence',
    GHR: 'Ganga Hall of Residence',
    RHR: 'Rishikulaya Hall of Residence',
    BHR: 'Brahmaputra Hall of Residence',
    SHR: 'Subarnarekha Hall of Residence',
    GH: 'Guest House'
}

function RequestComponent({bookingID,name,rollno,hostel,checkin,checkout,type1,type2,guest1Name,guest1Contact,guest1Email,guest2Name,guest2Contact,guest2Email}:RequestComponentProps){
    //Props for storing status and message
    const [message,setMessage]=useState("");
    const [status,setStatus]=useState("Pending");



    const [showDetails, setShowDetails] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMode, setDialogMode] = useState(""); 
    const messageInput = useRef<HTMLInputElement>(null);

    
    const handleClickOpen = (mode:string) => {
        setDialogMode(mode);
        setOpenDialog(()=>{
            setDialogMode(mode);
            return true;
        });
      };

    const handleClose = () => {
        setOpenDialog(false);
        setMessage("");
        setDialogMode("");

        
    };
    
    
    function CustomDialog(){
        
        return (
            <Dialog className="font-inter" 
            open={openDialog}
            onClose={handleClose}
            maxWidth={'md'}
            fullWidth={true}
            
          >
            <DialogTitle>Add Message</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter message to be sent to student
              </DialogContentText>
              <TextField
                autoFocus
                
                margin="dense"
                id="name"
                name="text"
                label="Message"
                type="text"
                fullWidth
                variant="standard"
                
                inputRef={messageInput}
              />
            </DialogContent>
            <DialogActions>
          <button className={`font-inter ${dialogMode === "Approve" ? "bg-green-700" : "bg-red-700"} text-white px-3 py-2 rounded-md font-medium text-sm hover:${dialogMode === "Approve" ? "bg-green-500" : "bg-red-600"} w-40`}
            onClick={()=>{
                setOpenDialog(()=>{
                    setStatus(()=>{
                        const statusHere=dialogMode === "Approve"? "Approved" : "Rejected"
                        return statusHere;
                    });
                    if(messageInput && messageInput.current){
                        setMessage(messageInput.current.value);
                    }
                    return false;
                });
            }}
          >{dialogMode === "Approve" ? "Confirm Approve" : "Confirm Reject"}</button>
        </DialogActions>
          </Dialog>
        );
    }
    
    return (
        <div className=" w-full border-2 rounded-md shadow-sm flex flex-col p-4 font-inter mb-4">
            <p className="text-xs text-gray-400">#BOOKING ID {bookingID} </p>
            <div className="flex flex-row items-end">
                <p className="font-bold sm:text-3xl text-2xl text-gray-700 font-inter">{name}</p>
                <p className="font-inter text-gray-500 sm:text-2xl text-xl ml-1"> ({rollno}) </p>    
            </div>

            <div className="flex flex-row items-center mt-2">
                <LocationOn style={{color: '#669eba'}} />
                <p className="text-md text-gray-600"> {hostelLabels[hostel]} </p>
            </div>
            
            <div className="flex flex-row items-center mt-2">
                <CalendarMonth style={{color: '#669eba'}} />
                <p className="text-md text-gray-600"> {checkin}-{checkout} </p>
            </div>

            <div className="flex flex-col">

                <div className="flex flex-row items-center mt-2">
                    <ViewListIcon style={{color: '#669eba'}} />
                    <p className="text-md text-gray-600"> Booked Room Details </p>
                </div>
                <div className='flex flex-row sm:w-auto mt-2 space-x-3'>
                    
                    <div className='border-2 rounded-2xl border-gray-700 text-gray-700 p-1 px-1 font-inter text-sm w-16 text-center'>{type1}</div>
                    <div className='border-2 rounded-2xl border-gray-700 p-1 px-2 font-inter text-sm text-gray-700 w-16 text-center '>{type2}</div>
                    
                </div>
            </div>
            
            

            <div className="flex flex-col sm:flex-row justify-between items-end mt-4">
                <div className="flex flex-row justify-between w-full max-w-[334px] sm:w-1/2 items-center">
                    <button className="font-inter bg-green-700 text-white px-3 py-2 rounded-md font-medium text-lg hover:bg-green-500 w-40"
                    onClick={()=>{handleClickOpen("Approve")}}
                    >Approve</button>
                    <button className="font-inter bg-red-700 text-white px-3 py-2 rounded-md font-medium text-lg hover:bg-red-600 w-40"
                    onClick={()=>{handleClickOpen("Reject")}}
                    >Reject</button>
                </div>

                <CustomDialog />
                
                <div className="flex flex-row text-sm text-custom-blue underline items-center w-full sm:w-auto justify-end">
                    <button onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "View less details" : "View more details"}
                    </button>
                    {showDetails ? <ArrowDropUp /> : <ArrowDropDown />}
                    
                </div>
            </div>

            

            {showDetails &&
            <div className="mt-3">
                <hr />
                <p className="font-inter text-lg mt-1 text-gray-700">Guest Details</p>
                <div className={`flex flex-row mt-3 text-sm font-inter justify-between sm:w-1/2 text-gray-700 transition-height duration-1000 ${
                    showDetails ? "max-h-full" : "max-h-0"
                }`}>
                    
                    <div className="flex flex-col">
                        
                        <div className="flex flex-row items-center">
                            <Person />
                            <p className="ml-1">{guest1Name}</p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <Phone />
                            <p className="ml-1">{guest1Contact}</p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <Mail />
                            <p className="ml-1">{guest1Email}</p>
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <div className="flex flex-row items-center">
                            <Person />
                            <p className="ml-1">{guest2Name}</p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <Phone />
                            <p className="ml-1">{guest2Contact}</p>
                        </div>
                        <div className="flex flex-row items-center mt-2">
                            <Mail />
                            <p className="ml-1">{guest2Email}</p>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
        
                        

                
        
    )
}

export default RequestComponent;