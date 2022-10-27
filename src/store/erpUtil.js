//import { Notify } from 'quasar'

/*export function toastMessage (type,msg) {

	  Notify.create({
		  message: msg,
		   type: type, 

		}) 
  }*/

export const failedMsg = "Sorry Process Failed !! Please Try Again.";
export const loadMsg = " Data Loaded Successfully";
export const saveMsg = " Data Saved Successfully";
export const updateMsg = " Data Updated Successfully";
export const deleteMsg = " Data Deleted Successfully";

// =========token name========
export const admin_token = "token";
export const student_token = "token";
export const college_token = "token";
export const college_user_token = "token";

export const navbarItems = [
  // National Versity
  {
    name: "National University",
    icon: "account_balance",
    link: "",
    role: ["admin"],
    sl_no: 1,
    children: [
      // center dashboard
      {
        name: "Center Dasboard",
        icon: "dashboard",
        link: "/center/center-dashboard",
        role: ["admin"],
        sl_no: 1
      },
      //center list
      {
        name: "Center",
        icon: "list",
        link: "/center/center-list",
        role: ["admin"],
        sl_no: 2
      },
      //attendence
      {
        name: "Attendence Generate",
        icon: "spellcheck",
        link: "/attendence",
        role: ["admin"],
        sl_no: 3
      }
    ]
  },

  // Center
  {
    name: "Center",
    icon: "library_books",
    link: "",
    role: ["admin"],
    sl_no: 2,
    children: [
      // center dashboard
      {
        name: "Center Dasboard",
        icon: "dashboard",
        link: "/center/center-dashboard",
        role: ["admin"],
        sl_no: 1
      },
      //Exam committee
      {
        name: "Exam Committee ",
        icon: "markunread_mailbox",
        link: "/exam_committee",
        role: ["admin"],
        sl_no: 2
      },
      //Center profile
      {
        name: "Center Profile",
        icon: "markunread_mailbox",
        link: "/center-profile",
        role: ["admin"],
        sl_no: 3
      },
      //Invigilator
      {
        name: "Invigilator",
        icon: "perm_identity",
        link: "/invigilator-list",
        role: ["admin"],
        sl_no: 4
      },
      //Attendence info
      {
        name: "Attendance Info",
        icon: "markunread_mailbox",
        link: "/attendence-info",
        role: ["admin"],
        sl_no: 5
      },
      //Blank script receive
      {
        name: "Blank Script Receive ",
        icon: "vertical_align_bottom",
        link: "/center/bs-coll-from-reg",
        role: ["admin"],
        sl_no: 6
      },
      //Loose Script distribute
      {
        name: "Loose Script Distribute",
        icon: "vertical_align_top",
        link: "/center/ls-dist-to-reg",
        role: ["admin"],
        sl_no: 7
      }
    ]
  },

  // regional center
  {
    name: "Regional Center",
    icon: "view_week",
    link: "",
    role: ["admin"],
    sl_no: 3,
    children: [
      //Regional center dashboard
      {
        name: "Regional Center Dashboard",
        icon: "markunread_mailbox",
        link: "/regional_center",
        role: ["admin"],
        sl_no: 1
      },
      //Regional center profile
      {
        name: "Regional Center Profile",
        icon: "markunread_mailbox",
        link: "/regional_profile",
        role: ["admin"],
        sl_no: 2
      },
      //Regional center user
      {
        name: "Regional Center User ",
        icon: "markunread_mailbox",
        link: "/regional_center_user",
        role: ["admin"],
        sl_no: 3
      },
      //Blank script collection
      {
        name: "Blank Script Collection",
        icon: "vertical_align_bottom",
        link: "/reg-center/bs-coll-from-nu",
        role: ["admin"],
        sl_no: 4
      },
      //Blank script distribution
      {
        name: "Blank Script Distribution",
        icon: "vertical_align_top",
        link: "/reg-center/bs-dist-to-cen",
        role: ["admin"],
        sl_no: 5
      },
      //Answer script collection from center
      {
        name: "Answer Script Collection From Center",
        icon: "vertical_align_bottom",
        link: "/reg-center/as-coll-from-cen",
        role: ["admin"],
        sl_no: 6
      },
      //Answer script distribution to examiner
      {
        name: "Answer Script Distribution To Examiner",
        icon: "vertical_align_top",
        link: "/reg-center/as-dist-to-exam",
        role: ["admin"],
        sl_no: 7
      },
      //Answer script collection from examiner
      {
        name: "Answer Script Collection From Examiner",
        icon: "vertical_align_bottom",
        link: "/reg-center/as-coll-from-exam",
        role: ["admin"],
        sl_no: 8
      },
      //Unused blank script collection
      {
        name: "Unused Blank Script Collection",
        icon: "vertical_align_bottom",
        link: "/reg-center/ls-coll-from-cen",
        role: ["admin"],
        sl_no: 9
      },
      //Unused blank script distribution
      {
        name: "Unused Blank Script Distribution",
        icon: "vertical_align_top",
        link: "/reg-center/ls-dist-to-nu",
        role: ["admin"],
        sl_no: 10
      }
    ]
  },

  //examiner
  {
    name: "Head Examiner/Examiner",
    icon: "supervisor_account",
    link: "",
    role: ["admin"],
    sl_no: 4,
    children: [
      //profile
      {
        name: "Profile",
        icon: "people_outline",
        link: "/",
        role: ["admin"],
        sl_no: 1
      },
      //Exam marks
      {
        name: "Exam Marks ",
        icon: "supervised_user_circle",
        link: "/examiner/mark",
        role: ["admin"],
        sl_no: 2
      },
      //Bills
      {
        name: "Bills",
        icon: "supervised_user_circle",
        link: "",
        role: ["admin"],
        sl_no: 3
      },
      //Comments
      {
        name: "Comments ",
        icon: "supervised_user_circle",
        link: "",
        role: ["admin"],
        sl_no: 4
      }
    ]
  },

  //   Invigilator
  {
    name: " Invigilator",
    icon: "account_circle",
    link: "",
    role: ["admin"],
    sl_no: 5,
    children: [
      //profile
      {
        name: "Profile",
        icon: "people_outline",
        link: "/",
        role: ["admin"],
        sl_no: 1
      },
      //Attendace collection
      {
        name: "Attendence Collection",
        icon: "people_outline",
        link: "/",
        role: ["admin"],
        sl_no: 2
      },
      //Reports
      {
        name: "Reports",
        icon: "people_outline",
        link: "/",
        role: ["admin"],
        sl_no: 3
      }
    ]
  },

  //   Admin
  {
    name: " Admin",
    icon: "account_circle",
    link: "",
    role: ["admin"],
    sl_no: 5,
    children: [
      //Admin Dasboard
      {
        name: "Admin Dasboard",
        icon: "dashboard",
        link: "/",
        role: ["admin"],
        sl_no: 1
      },
      //Center
      {
        name: "Center ",
        icon: "people_outline",
        link: "/center/center-list",
        role: ["admin"],
        sl_no: 2
      },
      //Regional center
      {
        name: "Regional Center ",
        icon: "people_outline",
        link: "/regional_center",
        role: ["admin"],
        sl_no: 3
      },
      //Users
      {
        name: "Users",
        icon: "people_outline",
        link: "/",
        role: ["admin"],
        sl_no: 4
      },
      //User role
      {
        name: "User Role",
        icon: "people_outline",
        link: "/role",
        role: ["admin"],
        sl_no: 5
      },
      //User role configure
      {
        name: "User Role Configure",
        icon: "people_outline",
        link: "/role-details",
        role: ["admin"],
        sl_no: 6
      },
      //User role assign
      {
        name: "User Role Assign",
        icon: "people_outline",
        link: "/role-grant",
        role: ["admin"],
        sl_no: 7
      },
      //Blank script distribute
      {
        name: "Blank Script Distribute",
        icon: "vertical_align_top",
        link: "/nu/bs-dist-to-reg",
        role: ["admin"],
        sl_no: 8
      },
      //Answer script receive
      {
        name: "Answer Script Receive",
        icon: "vertical_align_bottom",
        link: "/nu/as-coll-from-reg",
        role: ["admin"],
        sl_no: 9
      },
      //Answer script distribute
      {
        name: "Answer Script Distribute",
        icon: "vertical_align_top",
        link: "/nu/as-dist-to-reg",
        role: ["admin"],
        sl_no: 10
      },
      //Menus
      {
        name: "Menus",
        icon: "people_outline",
        link: "/menu-list",
        role: ["admin"],
        sl_no: 11
      },
      //Submenus
      {
        name: "Submenus",
        icon: "people_outline",
        link: "/submenu-list",
        role: ["admin"],
        sl_no: 12
      }
    ]
  },

  //   Audit
  {
    name: "Audit",
    icon: "supervised_user_circle",
    link: "",
    role: ["admin"],
    sl_no: 6,
    children: [
      //Audit filter
      {
        name: "Audit filter ",
        icon: "list",
        link: "/",
        role: ["admin"],
        sl_no: 1
      },
      //Reports
      {
        name: "Reports",
        icon: "how_to_reg",
        link: "/",
        role: ["admin"],
        sl_no: 2
      }
    ]
  },

  //   Practical Viva
  {
    name: "Practical Viva",
    icon: "supervised_user_circle",
    link: "",
    role: ["admin"],
    sl_no: 7,
    children: [
      //Practical/viva marks
      {
        name: "Practical/Viva Marks ",
        icon: "list",
        link: "/practical_viva/pv_exam_list",
        role: ["admin"],
        sl_no: 1
      },
      //Reports
      {
        name: "Reports",
        icon: "how_to_reg",
        link: "/practical_viva/pv_marks_entry",
        role: ["admin"],
        sl_no: 2
      }
    ]
  }
  //
];
