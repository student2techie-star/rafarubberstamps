import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  CheckCircle2, ShieldAlert, Upload, X, FileText,
  AlertCircle, MessageSquare, ArrowRight, RefreshCw, Copy, Lock, ArrowLeft
} from "lucide-react";
import SEO from "../components/SEO";
import { STAMP_TYPES, STAMP_SHAPES, STAMP_SIZES, INK_COLORS } from "../data/stampTypes";
import { validateIndianMobile, validatePincode, validateEmail, validateUploadedFile } from "../utils/validation";
import { generateOrderId, formatOrderWhatsAppMessage } from "../utils/whatsapp";
import { playStampSound } from "../utils/audio";
import { BUSINESS } from "../config";

export default function Order() {
  const [searchParams] = useSearchParams();
  const defaultType = searchParams.get("type") || "custom-rubber";

  // Form State
  const [formData, setFormData] = useState({
    // Step 1: Stamp Specifications
    stampType: defaultType,
    shape: "rectangle",
    size: "medium",
    customSizeWidth: "",
    customSizeHeight: "",
    quantity: 1,
    inkColor: "red",
    stampText: "",
    additionalRequirements: "",

    // Step 2: Sample Artwork & Govt ID
    designFile: null,
    governmentIdFile: null,
    confirmCorrect: false,
    agreeVerification: false,

    // Step 3: Customer Details & Address
    customerName: "",
    mobile: "",
    sameWhatsapp: true,
    whatsapp: "",
    email: "",
    deliveryLocation: "Tamil Nadu",
    address: "",
    city: "",
    district: "Tenkasi",
    state: "Tamil Nadu",
    pincode: ""
  });

  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [designFilePreview, setDesignFilePreview] = useState(null);
  const [govtIdPreview, setGovtIdPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [copiedNumber, setCopiedNumber] = useState(false);

  // Sync type parameter if present in query string
  useEffect(() => {
    if (searchParams.get("type")) {
      setFormData(prev => ({ ...prev, stampType: searchParams.get("type") }));
    }
  }, [searchParams]);

  // Handle Text inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: type === "checkbox" ? checked : value };
      if (name === "sameWhatsapp" && checked) {
        updated.whatsapp = prev.mobile;
      }
      return updated;
    });

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  // Design File Handler
  const handleDesignFileChange = (file) => {
    if (!file) return;
    const check = validateUploadedFile(file);
    if (!check.isValid) {
      setErrors(prev => ({ ...prev, designFile: check.error }));
      return;
    }

    setErrors(prev => ({ ...prev, designFile: null }));
    setFormData(prev => ({ ...prev, designFile: file }));

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setDesignFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setDesignFilePreview("pdf");
    }
  };

  const removeDesignFile = () => {
    setFormData(prev => ({ ...prev, designFile: null }));
    setDesignFilePreview(null);
  };

  // Govt ID File Handler
  const handleGovtIdChange = (file) => {
    if (!file) return;
    const check = validateUploadedFile(file);
    if (!check.isValid) {
      setErrors(prev => ({ ...prev, governmentIdFile: check.error }));
      return;
    }

    setErrors(prev => ({ ...prev, governmentIdFile: null }));
    setFormData(prev => ({ ...prev, governmentIdFile: file }));

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setGovtIdPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setGovtIdPreview("pdf");
    }
  };

  const removeGovtIdFile = () => {
    setFormData(prev => ({ ...prev, governmentIdFile: null }));
    setGovtIdPreview(null);
  };

  // Step Validation logic based on new order (1. Stamp -> 2. Sample/ID -> 3. Address -> 4. Review & Submit)
  const validateCurrentStep = () => {
    const errs = {};

    // Step 1: Stamp Specifications
    if (currentStep === 1) {
      if (!formData.stampType) errs.stampType = "Please select a stamp type.";
      if (!formData.stampText.trim()) {
        errs.stampText = "Please enter the exact text or content for your stamp.";
      }
      if (formData.size === "custom") {
        if (!formData.customSizeWidth || !formData.customSizeHeight) {
          errs.customSize = "Please specify custom width and height in mm.";
        }
      }
    }

    // Step 2: Sample Artwork & Govt ID Proof
    if (currentStep === 2) {
      if (!formData.confirmCorrect) {
        errs.confirmCorrect = "Please confirm that the provided information is correct.";
      }
      if (!formData.agreeVerification) {
        errs.agreeVerification = "Please agree to the order verification requirement.";
      }
    }

    // Step 3: Customer Details & Address
    if (currentStep === 3) {
      if (!formData.customerName.trim() || formData.customerName.trim().length < 2) {
        errs.customerName = "Please enter your full name (minimum 2 characters).";
      }
      if (!validateIndianMobile(formData.mobile)) {
        errs.mobile = "Please enter a valid 10-digit Indian mobile number.";
      }
      if (!formData.sameWhatsapp && formData.whatsapp && !validateIndianMobile(formData.whatsapp)) {
        errs.whatsapp = "Please enter a valid WhatsApp mobile number.";
      }
      if (formData.email && !validateEmail(formData.email)) {
        errs.email = "Please enter a valid email address.";
      }
      if (!formData.address.trim() || formData.address.trim().length < 5) {
        errs.address = "Please enter your complete delivery address.";
      }
      if (!formData.city.trim()) errs.city = "Please enter your city/town.";
      if (!formData.district.trim()) errs.district = "Please enter your district.";
      if (!validatePincode(formData.pincode)) {
        errs.pincode = "Please enter a valid 6-digit Indian PIN code.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 150, behavior: "smooth" });
  };

  // Submit Order Logic
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    playStampSound(); // Play satisfying stamp hit thud audio on submit
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = generateOrderId();
      const payload = {
        customerName: formData.customerName,
        mobile: formData.mobile,
        whatsapp: formData.sameWhatsapp ? formData.mobile : formData.whatsapp,
        email: formData.email,
        deliveryLocation: formData.deliveryLocation,

        address: formData.address,
        city: formData.city,
        district: formData.district,
        state: formData.state,
        pincode: formData.pincode,

        stampType: STAMP_TYPES.find(t => t.id === formData.stampType)?.name || formData.stampType,
        shape: STAMP_SHAPES.find(s => s.id === formData.shape)?.name || formData.shape,
        size: STAMP_SIZES.find(s => s.id === formData.size)?.name || formData.size,
        customSizeWidth: formData.customSizeWidth,
        customSizeHeight: formData.customSizeHeight,
        quantity: formData.quantity,
        inkColor: INK_COLORS.find(c => c.id === formData.inkColor)?.name || formData.inkColor,
        stampText: formData.stampText,
        additionalRequirements: formData.additionalRequirements,

        hasDesignFile: !!formData.designFile,
        hasGovtIdFile: !!formData.governmentIdFile
      };

      const result = formatOrderWhatsAppMessage(payload, orderId);
      setSubmissionResult(result);
      setIsSubmitting(false);
      window.scrollTo({ top: 100, behavior: "smooth" });
    }, 1000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(BUSINESS.orderWhatsappRaw);
    setCopiedNumber(true);
    setTimeout(() => setCopiedNumber(false), 2500);
  };

  const selectedTypeObj = STAMP_TYPES.find(t => t.id === formData.stampType);

  return (
    <>
      <SEO
        title={`Order Custom Rubber Stamp Online | ${BUSINESS.name}`}
        description={`Order your customized rubber stamp from ${BUSINESS.name} ${BUSINESS.city}. Select stamp details, upload design/ID sample, enter address, and submit order.`}
        canonical="/order"
      />

      {/* Header Banner */}
      <section className="page-header">
        <div className="container text-center">
          <span className="section-subtitle">DIRECT ONLINE ORDER WIZARD</span>
          <h1 className="page-title">Order Your Custom Stamp</h1>
          <p className="page-lead">
            Fill in your stamp requirements, upload design sample & Government ID, provide delivery address, and submit your order.
          </p>
        </div>
      </section>

      <section className="order-page-section">
        <div className="container">

          {/* Submission Success Screen */}
          {submissionResult ? (
            <div className="submission-success-card">
              <div className="success-icon-badge">
                <CheckCircle2 size={48} className="text-red" />
              </div>

              <span className="success-tag">ORDER DETAILS SUBMITTED</span>
              <h2 className="success-title">Thank You For Choosing Rafa Rubber Stamps!</h2>
              <p className="success-order-id">
                Order Reference ID: <strong>{submissionResult.orderId}</strong>
              </p>

              <div className="next-steps-card">
                <h4>Next Step To Finalize Production:</h4>
                <ol className="next-steps-list">
                  <li>
                    <span className="step-num">1</span>
                    <div>
                      <strong>Click "Continue to WhatsApp" below</strong>
                      <p>Send your prepared order reference and specifications to our WhatsApp desk.</p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">2</span>
                    <div>
                      <strong>Attach your Artwork / Signature / Design file</strong>
                      <p>
                        {formData.designFile
                          ? `Attach "${formData.designFile.name}" in WhatsApp chat.`
                          : "Attach your signature/logo artwork in WhatsApp chat."}
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className="step-num">3</span>
                    <div>
                      <strong>Attach your Government ID Proof</strong>
                      <p>
                        {formData.governmentIdFile
                          ? `Attach "${formData.governmentIdFile.name}" for order verification.`
                          : "Attach your ID proof for order verification where applicable."}
                      </p>
                    </div>
                  </li>
                </ol>

                <div className="attachment-warning-pill">
                  <ShieldAlert size={18} />
                  <span>Important: Please attach both sample artwork & ID files in WhatsApp before sending.</span>
                </div>
              </div>

              <div className="success-actions">
                <a
                  href={submissionResult.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-xl btn-block"
                >
                  <MessageSquare size={22} />
                  <span>Continue to WhatsApp (+91 93602 93815)</span>
                </a>

                <div className="copy-fallback-row">
                  <button className="btn btn-outline btn-sm" onClick={handleCopyPhone}>
                    <Copy size={16} />
                    <span>{copiedNumber ? "Number Copied!" : "Copy WhatsApp Number"}</span>
                  </button>
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      setSubmissionResult(null);
                      setCurrentStep(1);
                    }}
                  >
                    <RefreshCw size={16} />
                    <span>Start New Order</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Multi-Step Guided Form: 1. Stamp -> 2. Sample & Govt ID -> 3. Address -> 4. Review & Submit */
            <div className="order-form-container">
              
              {/* Stepper Progress Indicator */}
              <div className="order-stepper">
                <div className={`step-item ${currentStep >= 1 ? "active" : ""}`}>
                  <div className="step-circle">1</div>
                  <span className="step-label">1. Stamp Spec</span>
                </div>
                <div className="step-line" />
                <div className={`step-item ${currentStep >= 2 ? "active" : ""}`}>
                  <div className="step-circle">2</div>
                  <span className="step-label">2. Sample & Govt ID</span>
                </div>
                <div className="step-line" />
                <div className={`step-item ${currentStep >= 3 ? "active" : ""}`}>
                  <div className="step-circle">3</div>
                  <span className="step-label">3. Address</span>
                </div>
                <div className="step-line" />
                <div className={`step-item ${currentStep >= 4 ? "active" : ""}`}>
                  <div className="step-circle">4</div>
                  <span className="step-label">4. Submit Order</span>
                </div>
              </div>

              <form onSubmit={handleSubmitOrder} className="order-form">
                
                {/* STEP 1: Stamp Specifications */}
                {currentStep === 1 && (
                  <div className="form-step-card">
                    <h3 className="form-step-heading">Step 1 — Stamp Specifications</h3>
                    <p className="form-step-sub">Select the stamp type, shape, size, ink color, and text content.</p>

                    {/* Visual Stamp Type Selection Cards */}
                    <div className="form-group mb-4">
                      <label className="form-label required">Select Stamp Type</label>
                      <div className="stamp-type-grid">
                        {STAMP_TYPES.map(type => (
                          <div
                            key={type.id}
                            className={`stamp-type-card ${formData.stampType === type.id ? "selected" : ""}`}
                            onClick={() => setFormData(prev => ({ ...prev, stampType: type.id }))}
                          >
                            <div className="type-card-radio">
                              <span className="radio-dot" />
                            </div>
                            <div>
                              <h4>{type.name}</h4>
                              <p>{type.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      {errors.stampType && <span className="invalid-feedback d-block">{errors.stampType}</span>}
                    </div>

                    <div className="form-grid">
                      {/* Stamp Shape Cards */}
                      <div className="form-group col-6">
                        <label className="form-label required">Stamp Shape</label>
                        <select
                          name="shape"
                          value={formData.shape}
                          onChange={handleChange}
                          className="form-control"
                        >
                          {STAMP_SHAPES.map(s => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Size */}
                      <div className="form-group col-6">
                        <label className="form-label required">Stamp Size</label>
                        <select
                          name="size"
                          value={formData.size}
                          onChange={handleChange}
                          className="form-control"
                        >
                          {STAMP_SIZES.map(sz => (
                            <option key={sz.id} value={sz.id}>{sz.name} ({sz.desc})</option>
                          ))}
                        </select>
                      </div>

                      {formData.size === "custom" && (
                        <div className="form-group col-12 custom-size-inputs">
                          <div className="custom-size-row">
                            <div>
                              <label className="form-label required">Width (mm)</label>
                              <input
                                type="number"
                                name="customSizeWidth"
                                value={formData.customSizeWidth}
                                onChange={handleChange}
                                placeholder="e.g. 45"
                                className="form-control"
                              />
                            </div>
                            <div>
                              <label className="form-label required">Height (mm)</label>
                              <input
                                type="number"
                                name="customSizeHeight"
                                value={formData.customSizeHeight}
                                onChange={handleChange}
                                placeholder="e.g. 25"
                                className="form-control"
                              />
                            </div>
                          </div>
                          {errors.customSize && <span className="invalid-feedback d-block">{errors.customSize}</span>}
                        </div>
                      )}

                      {/* Quantity & Ink */}
                      <div className="form-group col-6">
                        <label className="form-label required">Quantity</label>
                        <input
                          type="number"
                          name="quantity"
                          min="1"
                          max="100"
                          value={formData.quantity}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>

                      <div className="form-group col-6">
                        <label className="form-label required">Ink Color</label>
                        <select
                          name="inkColor"
                          value={formData.inkColor}
                          onChange={handleChange}
                          className="form-control"
                        >
                          {INK_COLORS.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      {/* Exact Stamp Text */}
                      <div className="form-group col-12">
                        <label className="form-label required">Exact Stamp Text / Content</label>
                        <textarea
                          name="stampText"
                          rows="4"
                          value={formData.stampText}
                          onChange={handleChange}
                          placeholder="e.g.&#10;RAFA RUBBER STAMPS&#10;AUTHORIZED SIGNATORY&#10;TENKASI - 627811"
                          className={`form-control ${errors.stampText ? "is-invalid" : ""}`}
                        />
                        <div className="spelling-warning-notice">
                          <AlertCircle size={15} />
                          <span>Please check spelling carefully before submitting.</span>
                        </div>
                        {errors.stampText && <span className="invalid-feedback">{errors.stampText}</span>}
                      </div>

                      <div className="form-group col-12">
                        <label className="form-label">Additional Instructions (Optional)</label>
                        <textarea
                          name="additionalRequirements"
                          rows="2"
                          value={formData.additionalRequirements}
                          onChange={handleChange}
                          placeholder="e.g. Need bold border line, round seal style, or urgent dispatch requirement."
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="form-actions-step">
                      <div />
                      <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                        <span>Continue to Sample & Govt ID</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Sample Artwork & Govt ID Proof */}
                {currentStep === 2 && (
                  <div className="form-step-card">
                    <h3 className="form-step-heading">Step 2 — Sample Design & Government ID</h3>
                    <p className="form-step-sub">Upload your sample logo/signature design and Government ID proof.</p>

                    {/* Sample Design / Signature File Upload Box */}
                    <div className="upload-block mb-4">
                      <div className="upload-block-header">
                        <h4>Upload Sample Signature / Logo / Design</h4>
                        <span className="upload-sub">PNG, JPG, JPEG, WEBP, or PDF (Max 10 MB)</span>
                      </div>

                      {formData.designFile ? (
                        <div className="uploaded-file-card">
                          <div className="file-info">
                            <FileText size={24} className="file-icon text-red" />
                            <div>
                              <strong className="file-name">{formData.designFile.name}</strong>
                              <span className="file-size">{(formData.designFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                          </div>
                          {designFilePreview && designFilePreview !== "pdf" && (
                            <div className="img-preview-box">
                              <img src={designFilePreview} alt="Design sample preview" />
                            </div>
                          )}
                          <button type="button" className="btn-remove-file" onClick={removeDesignFile}>
                            <X size={18} />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <label className="dropzone-box">
                          <input
                            type="file"
                            accept=".png,.jpg,.jpeg,.webp,.pdf"
                            onChange={(e) => handleDesignFileChange(e.target.files[0])}
                          />
                          <Upload size={36} className="dropzone-icon" />
                          <span className="dropzone-title">Drag & Drop or Browse Sample Artwork</span>
                          <span className="dropzone-desc">Upload clear signature image or logo file</span>
                        </label>
                      )}
                      {errors.designFile && <span className="invalid-feedback d-block mt-2">{errors.designFile}</span>}

                      <div className="quality-tip-box">
                        <AlertCircle size={16} />
                        <span>For the best stamp result, upload the highest-quality artwork available. Clear black-and-white artwork is preferred.</span>
                      </div>
                    </div>

                    {/* Government ID Verification Upload Box */}
                    <div className="upload-block mb-4">
                      <div className="upload-block-header">
                        <h4 className="d-flex align-items-center gap-2">
                          <Lock size={18} className="text-red" />
                          Government ID Proof
                        </h4>
                        <span className="upload-sub">Government ID proof is required for order verification where applicable.</span>
                      </div>

                      {formData.governmentIdFile ? (
                        <div className="uploaded-file-card">
                          <div className="file-info">
                            <FileText size={24} className="file-icon text-red" />
                            <div>
                              <strong className="file-name">{formData.governmentIdFile.name}</strong>
                              <span className="file-size">{(formData.governmentIdFile.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                          </div>
                          <button type="button" className="btn-remove-file" onClick={removeGovtIdFile}>
                            <X size={18} />
                            <span>Remove</span>
                          </button>
                        </div>
                      ) : (
                        <label className="dropzone-box">
                          <input
                            type="file"
                            accept=".png,.jpg,.jpeg,.pdf"
                            onChange={(e) => handleGovtIdChange(e.target.files[0])}
                          />
                          <Upload size={32} className="dropzone-icon" />
                          <span className="dropzone-title">Browse Government ID Proof</span>
                          <span className="dropzone-desc">JPG, JPEG, PNG, or PDF (Max 10 MB)</span>
                        </label>
                      )}
                      {errors.governmentIdFile && <span className="invalid-feedback d-block mt-2">{errors.governmentIdFile}</span>}

                      <div className="id-privacy-notice-box">
                        <Lock size={16} />
                        <span>🔒 Your document is used only for order verification. Please upload only the document required for order verification. Do not upload unnecessary personal documents or sensitive information.</span>
                      </div>
                    </div>

                    {/* Verification Consent Checkboxes */}
                    <div className="consent-block mb-4">
                      <label className="checkbox-container mb-3">
                        <input
                          type="checkbox"
                          name="confirmCorrect"
                          checked={formData.confirmCorrect}
                          onChange={handleChange}
                        />
                        <span className="checkbox-custom" />
                        <span>I confirm that the information provided is correct.</span>
                      </label>
                      {errors.confirmCorrect && <span className="invalid-feedback d-block mb-2">{errors.confirmCorrect}</span>}

                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          name="agreeVerification"
                          checked={formData.agreeVerification}
                          onChange={handleChange}
                        />
                        <span className="checkbox-custom" />
                        <span>I agree to the order verification requirement.</span>
                      </label>
                      {errors.agreeVerification && <span className="invalid-feedback d-block">{errors.agreeVerification}</span>}
                    </div>

                    <div className="form-actions-step">
                      <button type="button" className="btn btn-outline" onClick={handlePrevStep}>
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </button>
                      <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                        <span>Continue to Address</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Customer Details & Address */}
                {currentStep === 3 && (
                  <div className="form-step-card">
                    <h3 className="form-step-heading">Step 3 — Address & Contact Details</h3>
                    <p className="form-step-sub">Provide your contact details and delivery address.</p>

                    <div className="form-grid">
                      <div className="form-group col-12">
                        <label className="form-label required">Full Name</label>
                        <input
                          type="text"
                          name="customerName"
                          value={formData.customerName}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className={`form-control ${errors.customerName ? "is-invalid" : ""}`}
                        />
                        {errors.customerName && <span className="invalid-feedback">{errors.customerName}</span>}
                      </div>

                      <div className="form-group col-6">
                        <label className="form-label required">Mobile Number</label>
                        <input
                          type="tel"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          placeholder="e.g. 9876543210"
                          className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                        />
                        {errors.mobile && <span className="invalid-feedback">{errors.mobile}</span>}
                      </div>

                      <div className="form-group col-6">
                        <label className="form-label">Email Address (Optional)</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="name@example.com"
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        />
                        {errors.email && <span className="invalid-feedback">{errors.email}</span>}
                      </div>

                      <div className="form-group col-12">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            name="sameWhatsapp"
                            checked={formData.sameWhatsapp}
                            onChange={handleChange}
                          />
                          <span className="checkbox-custom" />
                          <span>My WhatsApp number is the same as my mobile number</span>
                        </label>
                      </div>

                      {!formData.sameWhatsapp && (
                        <div className="form-group col-6">
                          <label className="form-label required">WhatsApp Number</label>
                          <input
                            type="tel"
                            name="whatsapp"
                            value={formData.whatsapp}
                            onChange={handleChange}
                            placeholder="Enter WhatsApp mobile number"
                            className={`form-control ${errors.whatsapp ? "is-invalid" : ""}`}
                          />
                          {errors.whatsapp && <span className="invalid-feedback">{errors.whatsapp}</span>}
                        </div>
                      )}

                      <div className="form-group col-12">
                        <label className="form-label">Delivery Location</label>
                        <div className="radio-group-cards">
                          {["Tenkasi", "Tamil Nadu", "Other State"].map(loc => (
                            <label key={loc} className={`radio-card ${formData.deliveryLocation === loc ? "selected" : ""}`}>
                              <input
                                type="radio"
                                name="deliveryLocation"
                                value={loc}
                                checked={formData.deliveryLocation === loc}
                                onChange={handleChange}
                              />
                              <span>{loc}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="form-group col-12">
                        <label className="form-label required">Full Delivery Address</label>
                        <textarea
                          name="address"
                          rows="3"
                          value={formData.address}
                          onChange={handleChange}
                          placeholder="Enter complete building name, door number, street, and landmark"
                          className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        />
                        {errors.address && <span className="invalid-feedback">{errors.address}</span>}
                      </div>

                      <div className="form-group col-4">
                        <label className="form-label required">City / Town</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="e.g. Tenkasi"
                          className={`form-control ${errors.city ? "is-invalid" : ""}`}
                        />
                        {errors.city && <span className="invalid-feedback">{errors.city}</span>}
                      </div>

                      <div className="form-group col-4">
                        <label className="form-label required">District</label>
                        <input
                          type="text"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          placeholder="e.g. Tenkasi"
                          className={`form-control ${errors.district ? "is-invalid" : ""}`}
                        />
                        {errors.district && <span className="invalid-feedback">{errors.district}</span>}
                      </div>

                      <div className="form-group col-4">
                        <label className="form-label required">Pincode</label>
                        <input
                          type="text"
                          name="pincode"
                          maxLength="6"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="6-digit pincode"
                          className={`form-control ${errors.pincode ? "is-invalid" : ""}`}
                        />
                        {errors.pincode && <span className="invalid-feedback">{errors.pincode}</span>}
                      </div>

                      <div className="form-group col-6">
                        <label className="form-label required">State</label>
                        <input
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="form-actions-step">
                      <button type="button" className="btn btn-outline" onClick={handlePrevStep}>
                        <ArrowLeft size={16} />
                        <span>Back</span>
                      </button>
                      <button type="button" className="btn btn-primary" onClick={handleNextStep}>
                        <span>Review Order</span>
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Review Order & Submit */}
                {currentStep === 4 && (
                  <div className="form-step-card">
                    <h3 className="form-step-heading">Step 4 — Review & Submit Order</h3>
                    <p className="form-step-sub">Please review your order details before final submission.</p>

                    {/* Full Order Summary Card */}
                    <div className="order-summary-box mb-4">
                      <h4>Complete Order Details</h4>
                      <div className="summary-grid">
                        <div>
                          <span className="s-label">Stamp Type:</span>
                          <strong className="s-val">{selectedTypeObj?.name}</strong>
                        </div>
                        <div>
                          <span className="s-label">Shape & Size:</span>
                          <strong className="s-val">{formData.shape.toUpperCase()} • {formData.size}</strong>
                        </div>
                        <div>
                          <span className="s-label">Quantity:</span>
                          <strong className="s-val">{formData.quantity}</strong>
                        </div>
                        <div>
                          <span className="s-label">Ink Color:</span>
                          <strong className="s-val">{formData.inkColor.toUpperCase()}</strong>
                        </div>
                        <div className="col-12" style={{ gridColumn: "span 2" }}>
                          <span className="s-label">Stamp Text:</span>
                          <strong className="s-val">"{formData.stampText}"</strong>
                        </div>
                        <div>
                          <span className="s-label">Sample Artwork:</span>
                          <strong className="s-val">{formData.designFile ? formData.designFile.name : "None (Text Only)"}</strong>
                        </div>
                        <div>
                          <span className="s-label">Government ID:</span>
                          <strong className="s-val">{formData.governmentIdFile ? formData.governmentIdFile.name : "None"}</strong>
                        </div>
                        <div>
                          <span className="s-label">Customer Name:</span>
                          <strong className="s-val">{formData.customerName}</strong>
                        </div>
                        <div>
                          <span className="s-label">Mobile Number:</span>
                          <strong className="s-val">{formData.mobile}</strong>
                        </div>
                        <div className="col-12" style={{ gridColumn: "span 2" }}>
                          <span className="s-label">Delivery Address:</span>
                          <strong className="s-val">{formData.address}, {formData.city}, {formData.district}, {formData.state} - {formData.pincode}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="form-actions-step">
                      <button type="button" className="btn btn-outline" onClick={handlePrevStep}>
                        <ArrowLeft size={16} />
                        <span>Edit Order Details</span>
                      </button>
                      
                      {/* Submit Order Button (not labelled continue to whatsapp) */}
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span>Preparing Order...</span>
                        ) : (
                          <>
                            <span>Submit Order</span>
                            <CheckCircle2 size={20} />
                          </>
                        )}
                      </button>
                    </div>

                  </div>
                )}

              </form>
            </div>
          )}

        </div>
      </section>

    </>
  );
}
