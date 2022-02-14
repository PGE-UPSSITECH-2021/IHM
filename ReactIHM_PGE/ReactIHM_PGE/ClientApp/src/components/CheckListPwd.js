/* Project : DBRIF
 * Authors : Julie PIVIN-BACHLER & Anaïs MONDIN
 * Date : 2021-2022
 * 3A SRI
 */

import React from 'react';
import '../styles/PasswordStrength.css';

const CheckListPwd = props => {

    const { data } = props
    const labelList = data[0]
    const meetsReq = data[1]

    const setClass = () => {
        const classArr = ["must-line"]
        if (meetsReq) classArr.push('cross-out')
        return classArr.join(' ')
    }

    return (
        <div>
            <div className="must-item">
                <li className="must-text">{labelList}</li>
                <div className={setClass()}></div>
            </div>
        </div>
    );
}

export default CheckListPwd;