import React from 'react';
import DashboardTitle from '../../SharedComponents/DashboardTitle/DashboardTitle';
import { Document, Page } from 'react-pdf';

import samplePDF from './test.pdf'
import CreateQuiz from './Components/CreateQuiz';

const Assignments = () => {

    const handleAssignemnts = () => {
        
    }

    return (
        <div>
            <div>
                {/* dashboard with title and subtitle */}
                <DashboardTitle title="Assignments" subTitle="Create Assignments" />
            </div>
            <div className='w-full'>
                <CreateQuiz></CreateQuiz>
            </div>
        </div>
    );
};

export default Assignments;